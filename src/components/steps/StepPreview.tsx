import React, { useState } from 'react';
import { useQuoteStore } from '../../store/useQuoteStore';
import { Button } from '../ui/Button';

export const StepPreview: React.FC = () => {
  const { profesional, cliente, items, config, goToStep, saveQuote } = useQuoteStore();
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const documentRef = React.useRef<HTMLDivElement>(null);

  const calcularTotal = () => {
    const subtotal = items.reduce((sum, item) => sum + item.precio, 0);
    const iva = config.ivaEnabled ? subtotal * (config.iva / 100) : 0;
    return { subtotal, iva, total: subtotal + iva };
  };

  const { subtotal, iva, total } = calcularTotal();
  const enabledConditions = config.condiciones.filter(c => c.enabled);
  const customConditions = config.condicionesCustom.split('\n').filter(l => l.trim());

  const handleSaveQuote = () => {
    saveQuote();
    alert('Presupuesto guardado correctamente');
  };

  const handleDownloadPDF = async () => {
    if (!documentRef.current) return;
    setIsGenerating(true);
    
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const element = documentRef.current;
      
      const opt = {
        margin: 5,
        filename: `presupuesto-${cliente.nombre || 'cliente'}-${Date.now()}.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const }
      };
      
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error al generar PDF');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleWhatsApp = (type: 'text' | 'pdf') => {
    const condiciones = [
      ...enabledConditions.map(c => c.label),
      ...customConditions
    ];
    
    let mensaje = `*PRESUPUESTO*
━━━━━━━━━━━━━━━━

*Cliente:* ${cliente.nombre || 'Sin nombre'}
${cliente.empresa ? `*Empresa:* ${cliente.empresa}` : ''}
${cliente.telefono ? `*Tel:* ${cliente.telefono}` : ''}
${cliente.proyecto ? `*Proyecto:* ${cliente.proyecto}` : ''}

*Items:*
${items.map(item => `• ${item.titulo}: $${item.precio.toFixed(2)}`).join('\n')}

━━━━━━━━━━━━━━━━
*Subtotal:* $${subtotal.toFixed(2)}
${config.ivaEnabled ? `*IVA (${config.iva}%):* $${iva.toFixed(2)}` : ''}
*TOTAL:* $${total.toFixed(2)}
━━━━━━━━━━━━━━━━

${condiciones.length > 0 ? `*Condiciones:*\n${condiciones.map(c => `• ${c}`).join('\n')}\n\n` : ''}*Válido ${config.validez} días*

${profesional.nombre}
${profesional.contacto}
${profesional.alias ? `Alias: ${profesional.alias}` : ''}`;

    const phone = cliente.telefono?.replace(/\D/g, '') || '';
    const encoded = encodeURIComponent(mensaje);
    
    if (type === 'text') {
      window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
    } else {
      handleDownloadPDF().then(() => {
        setTimeout(() => {
          window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
        }, 1000);
      });
    }
    setShowShareOptions(false);
  };

  const handleEdit = () => {
    goToStep(1);
  };

  return (
    <div className="space-y-4">
      {/* Actions Bar */}
      <div className="flex flex-wrap gap-2 justify-between items-center">
        <div className="flex gap-2">
          <Button variant="primary" onClick={handleSaveQuote} className="h-10 text-sm">
            <span className="material-symbols-outlined text-lg">save</span>
            Guardar
          </Button>
        </div>
        
        <div className="flex gap-2">
          <div className="relative">
            <Button variant="whatsapp" onClick={() => setShowShareOptions(!showShareOptions)} className="h-10 text-sm">
              <span className="material-symbols-outlined text-lg">send</span>
              WhatsApp
            </Button>
            
            {showShareOptions && (
              <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden z-20">
                <button onClick={() => handleWhatsApp('text')} className="w-full px-4 py-2.5 text-left hover:bg-slate-50 flex items-center gap-2 text-sm">
                  <span className="material-symbols-outlined text-green-500 text-lg">chat</span>
                  Solo texto
                </button>
                <button onClick={() => handleWhatsApp('pdf')} className="w-full px-4 py-2.5 text-left hover:bg-slate-50 flex items-center gap-2 text-sm">
                  <span className="material-symbols-outlined text-red-500 text-lg">picture_as_pdf</span>
                  Con PDF
                </button>
              </div>
            )}
          </div>

          <Button variant="secondary" onClick={handleDownloadPDF} disabled={isGenerating} className="h-10 text-sm">
            <span className="material-symbols-outlined text-lg">download</span>
            {isGenerating ? '...' : 'PDF'}
          </Button>

          <Button variant="ghost" onClick={handleEdit} className="h-10 text-sm">
            <span className="material-symbols-outlined text-lg">edit</span>
          </Button>
        </div>
      </div>

      {/* Document Preview */}
      <div className="overflow-auto bg-slate-100 rounded-xl p-4">
        <div 
          ref={documentRef}
          className="bg-white mx-auto"
          style={{ 
            width: '210mm', 
            minHeight: '297mm', 
            padding: '15mm',
            fontSize: '10pt',
            lineHeight: 1.3
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15mm' }}>
            <div>
              {profesional.logo ? (
                <img src={profesional.logo} alt="Logo" style={{ width: '40px', height: '40px', objectFit: 'contain', marginBottom: '5px' }} />
              ) : (
                <div style={{ width: '40px', height: '40px', backgroundColor: '#2563eb', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '5px' }}>
                  <span className="material-symbols-outlined" style={{ color: 'white', fontSize: '20px' }}>bolt</span>
                </div>
              )}
              <p style={{ fontWeight: 'bold', fontSize: '12pt', color: '#1e293b' }}>{profesional.nombre || 'Tu Nombre'}</p>
              <p style={{ fontSize: '9pt', color: '#64748b' }}>{profesional.profesion}</p>
              {profesional.contacto && <p style={{ fontSize: '8pt', color: '#94a3b8', marginTop: '2px' }}>{profesional.contacto}</p>}
              {profesional.alias && <p style={{ fontSize: '8pt', color: '#2563eb', marginTop: '2px' }}>Alias: {profesional.alias}</p>}
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ display: 'inline-block', padding: '3px 8px', backgroundColor: '#1e293b', color: 'white', fontSize: '8pt', fontWeight: 'bold', borderRadius: '4px' }}>PRESUPUESTO</span>
              <p style={{ fontSize: '8pt', color: '#94a3b8', marginTop: '5px' }}>SQ-{Date.now().toString().slice(-6)}</p>
            </div>
          </div>

          {/* Client Info */}
          <div style={{ backgroundColor: '#f8fafc', padding: '10px', borderRadius: '8px', marginBottom: '15mm' }}>
            <p style={{ fontSize: '7pt', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>Cliente</p>
            <p style={{ fontWeight: '600', fontSize: '11pt', color: '#1e293b' }}>{cliente.nombre || 'Sin nombre'}</p>
            {cliente.empresa && <p style={{ fontSize: '9pt', color: '#475569' }}>{cliente.empresa}</p>}
            {cliente.telefono && <p style={{ fontSize: '9pt', color: '#64748b' }}>{cliente.telefono}</p>}
            {cliente.email && <p style={{ fontSize: '9pt', color: '#64748b' }}>{cliente.email}</p>}
            {cliente.direccion && <p style={{ fontSize: '9pt', color: '#64748b' }}>{cliente.direccion}</p>}
            {cliente.proyecto && (
              <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #e2e8f0' }}>
                <p style={{ fontSize: '7pt', color: '#94a3b8', textTransform: 'uppercase' }}>Proyecto</p>
                <p style={{ fontSize: '10pt', color: '#2563eb', fontWeight: '500' }}>{cliente.proyecto}</p>
              </div>
            )}
          </div>

          {/* Items Table */}
          <table style={{ width: '100%', marginBottom: '15mm', fontSize: '9pt' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #1e293b' }}>
                <th style={{ textAlign: 'left', padding: '5px 0', fontSize: '8pt', color: '#475569', textTransform: 'uppercase' }}>Descripción</th>
                <th style={{ textAlign: 'right', padding: '5px 0', fontSize: '8pt', color: '#475569', textTransform: 'uppercase', width: '60mm' }}>Importe</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '6px 0' }}>
                    <p style={{ fontWeight: '500', color: '#1e293b', fontSize: '9pt' }}>{item.titulo}</p>
                    {item.descripcion && <p style={{ fontSize: '7pt', color: '#94a3b8', marginTop: '2px' }}>{item.descripcion}</p>}
                  </td>
                  <td style={{ textAlign: 'right', padding: '6px 0', fontWeight: '500', color: '#1e293b' }}>${item.precio.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '15mm' }}>
            <div style={{ width: '55mm' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: '9pt' }}>
                <span style={{ color: '#64748b' }}>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {config.ivaEnabled && (
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: '9pt' }}>
                  <span style={{ color: '#64748b' }}>IVA ({config.iva}%)</span>
                  <span>${iva.toFixed(2)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', backgroundColor: '#1e293b', color: 'white', borderRadius: '6px', marginTop: '4px' }}>
                <span style={{ fontWeight: 'bold', fontSize: '10pt' }}>TOTAL</span>
                <span style={{ fontWeight: 'bold', fontSize: '12pt' }}>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Conditions */}
          {(enabledConditions.length > 0 || customConditions.length > 0) && (
            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '10mm', marginBottom: '10mm' }}>
              <p style={{ fontSize: '7pt', color: '#64748b', textTransform: 'uppercase', marginBottom: '5px', fontWeight: '600' }}>Condiciones</p>
              <ul style={{ fontSize: '8pt', color: '#475569', paddingLeft: '12px', margin: 0 }}>
                {enabledConditions.map(condition => (
                  <li key={condition.id} style={{ marginBottom: '2px' }}>{condition.label}</li>
                ))}
                {customConditions.map((line, idx) => (
                  <li key={idx}>{line}</li>
                ))}
              </ul>
              <p style={{ fontSize: '8pt', color: '#94a3b8', marginTop: '8px' }}>Válido por {config.validez} días</p>
            </div>
          )}

          {/* Professional Footer */}
          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '8mm', textAlign: 'center' }}>
            {profesional.matricula && <p style={{ fontSize: '8pt', color: '#94a3b8' }}>Matrícula: {profesional.matricula}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};
