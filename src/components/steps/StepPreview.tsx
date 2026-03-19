import React, { useState } from 'react';
import { useQuoteStore } from '../../store/useQuoteStore';

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
      
      const pdf = html2pdf().set(opt).from(element);
      await pdf.save();
      
      const blob = await pdf.output('blob');
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error al generar PDF');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadImage = async () => {
    if (!documentRef.current) return;
    setIsGenerating(true);
    
    try {
      const html2canvas = (await import('html2canvas')).default;
      const element = documentRef.current;
      
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      const link = document.createElement('a');
      link.download = `presupuesto-${cliente.nombre || 'cliente'}-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Error al generar imagen');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleWhatsApp = (type: 'text' | 'image') => {
    const condiciones = [
      ...enabledConditions.map(c => c.label),
      ...customConditions
    ];
    
    const itemsDetail = items.map((item, idx) => {
      let line = `${idx + 1}. ${item.titulo}`;
      if (item.descripcion) {
        line += `\n   ${item.descripcion}`;
      }
      line += `: $${item.precio.toFixed(2)}`;
      return line;
    }).join('\n');
    
    const mensaje = `*PRESUPUESTO*
━━━━━━━━━━━━━━━━━━━━━━━━

*CLIENTE*
👤 ${cliente.nombre || 'Sin nombre'}
${cliente.empresa ? `🏢 ${cliente.empresa}` : ''}
${cliente.telefono ? `📞 ${cliente.telefono}` : ''}
${cliente.email ? `📧 ${cliente.email}` : ''}
${cliente.direccion ? `📍 ${cliente.direccion}` : ''}
${cliente.proyecto ? `\n📋 *Proyecto:* ${cliente.proyecto}` : ''}

*DETALLE DEL PRESUPUESTO*
${itemsDetail}

━━━━━━━━━━━━━━━━━━━━━━━━
💰 *Subtotal:* $${subtotal.toFixed(2)}
${config.ivaEnabled ? `📊 *IVA (${config.iva}%):* $${iva.toFixed(2)}` : ''}
✅ *TOTAL:* $${total.toFixed(2)}
━━━━━━━━━━━━━━━━━━━━━━━━

${condiciones.length > 0 ? `📝 *Condiciones:*\n${condiciones.map(c => `• ${c}`).join('\n')}\n\n` : ''}⏰ *Válido por ${config.validez} días*

━━━━━━━━━━━━━━━━━━━━━━━━
👨‍💼 ${profesional.nombre || 'Tu Nombre'}
${profesional.contacto || ''}
${profesional.alias ? `💳 Alias: ${profesional.alias}` : ''}
${profesional.matricula ? `📋 Mat: ${profesional.matricula}` : ''}`;

    const phone = cliente.telefono?.replace(/\D/g, '') || '';
    const encoded = encodeURIComponent(mensaje);
    
    if (type === 'text') {
      window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
    } else {
      handleDownloadImage().then(() => {
        setTimeout(() => {
          window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
        }, 1500);
      });
    }
    setShowShareOptions(false);
  };

  const handleEdit = () => {
    goToStep(1);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Actions Bar - Fixed at top */}
      <div className="flex flex-wrap gap-2 justify-between items-center mb-4">
        <button onClick={handleSaveQuote} className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-all border border-slate-700">
          <span className="material-symbols-outlined text-sm">save</span>
          <span className="text-sm font-medium">Guardar</span>
        </button>
        
        <div className="flex gap-1.5 items-center">
          <button onClick={handleEdit} className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-xl transition-all border border-slate-700">
            <span className="material-symbols-outlined text-sm">edit</span>
          </button>

          <button onClick={handleDownloadImage} disabled={isGenerating} className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-xl transition-all border border-slate-700">
            <span className="material-symbols-outlined text-sm">image</span>
          </button>

          <button onClick={handleDownloadPDF} disabled={isGenerating} className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-xl transition-all border border-slate-700">
            <span className="material-symbols-outlined text-sm">download</span>
          </button>

          <div className="relative">
            <button 
              onClick={() => setShowShareOptions(!showShareOptions)} 
              className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-400 text-white rounded-xl transition-all shadow-lg shadow-green-500/20"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span className="text-sm font-medium hidden sm:inline">Enviar</span>
            </button>
            
            {showShareOptions && (
              <div className="absolute top-full right-0 mt-2 w-44 bg-slate-800 rounded-xl shadow-xl border border-slate-700 overflow-hidden z-20">
                <button onClick={() => handleWhatsApp('text')} className="w-full px-4 py-3 text-left hover:bg-slate-700 flex items-center gap-3 transition-colors">
                  <span className="material-symbols-outlined text-green-400">chat</span>
                  <div>
                    <p className="text-sm text-slate-200 font-medium">Solo texto</p>
                    <p className="text-xs text-slate-500">Mensaje formateado</p>
                  </div>
                </button>
                <button onClick={() => handleWhatsApp('image')} className="w-full px-4 py-3 text-left hover:bg-slate-700 flex items-center gap-3 transition-colors">
                  <span className="material-symbols-outlined text-blue-400">image</span>
                  <div>
                    <p className="text-sm text-slate-200 font-medium">Con imagen</p>
                    <p className="text-xs text-slate-500">Adjunta captura</p>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Close dropdown on click outside */}
      {showShareOptions && (
        <div className="fixed inset-0 z-10" onClick={() => setShowShareOptions(false)} />
      )}

      {/* Document Preview - Scrollable */}
      <div className="flex-1 overflow-auto bg-slate-900/50 rounded-xl p-4 lg:p-6 border border-slate-800">
        <div 
          ref={documentRef}
          className="bg-white mx-auto shadow-2xl"
          style={{ 
            width: '210mm',
            minHeight: '297mm',
            padding: '15mm',
            fontSize: '10pt',
            lineHeight: 1.3,
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15mm' }}>
            <div>
              {profesional.logo && (
                <img 
                  src={profesional.logo} 
                  alt="Logo" 
                  style={{ 
                    maxWidth: '52px', 
                    maxHeight: '52px', 
                    width: 'auto', 
                    height: 'auto', 
                    objectFit: 'contain', 
                    marginBottom: '5px' 
                  }} 
                />
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

          {/* Branding Footer */}
          <div style={{ textAlign: 'center', marginTop: '12mm', paddingTop: '6mm', borderTop: '1px dashed #cbd5e1' }}>
            <p style={{ fontSize: '8pt', color: '#94a3b8', marginBottom: '2px' }}>Este presupuesto fue creado gratuitamente en</p>
            <a 
              href="https://presspuesto.com" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ fontSize: '9pt', color: '#2563eb', fontWeight: '600', textDecoration: 'none' }}
            >
              presspuesto.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
