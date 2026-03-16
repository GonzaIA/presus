import React from 'react';
import { useQuoteStore } from '../../store/useQuoteStore';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

export const StepPreview: React.FC = () => {
  const { profesional, cliente, items, config, goToStep, saveQuote } = useQuoteStore();
  const [showShareOptions, setShowShareOptions] = React.useState(false);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const documentRef = React.useRef<HTMLDivElement>(null);

  const calcularTotal = () => {
    const subtotal = items.reduce((sum, item) => sum + item.precio, 0);
    const iva = config.ivaEnabled ? subtotal * (config.iva / 100) : 0;
    return { subtotal, iva, total: subtotal + iva };
  };

  const { subtotal, iva, total } = calcularTotal();
  const enabledConditions = config.condiciones.filter(c => c.enabled);

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
        margin: [10, 10, 10, 10] as [number, number, number, number],
        filename: `presupuesto-${cliente.nombre || 'cliente'}-${Date.now()}.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const }
      };
      
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error al generar PDF. Intenta de nuevo.');
    } finally {
      setIsGenerating(false);
    }
  };

  const getWhatsAppMessage = () => {
    const condiciones = [
      ...enabledConditions.map(c => c.label),
      ...config.condicionesCustom.split('\n').filter(l => l.trim())
    ];
    
    let mensaje = `*PRESUPUESTO*
━━━━━━━━━━━━━━━━━━

*Cliente:* ${cliente.nombre || 'Sin nombre'}
${cliente.empresa ? `*Empresa:* ${cliente.empresa}` : ''}
${cliente.telefono ? `*Teléfono:* ${cliente.telefono}` : ''}
${cliente.proyecto ? `*Proyecto:* ${cliente.proyecto}` : ''}

*Detalle:*
${items.map((item) => `• ${item.titulo}: $${item.precio.toFixed(2)}`).join('\n')}

━━━━━━━━━━━━━━━━━━
*Subtotal:* $${subtotal.toFixed(2)}
${config.ivaEnabled ? `*IVA (${config.iva}%):* $${iva.toFixed(2)}` : ''}
*TOTAL:* $${total.toFixed(2)}
━━━━━━━━━━━━━━━━━━

${condiciones.length > 0 ? `*Condiciones:*\n${condiciones.map(c => `• ${c}`).join('\n')}\n\n` : ''}*Válido por ${config.validez} días*

${profesional.nombre || 'Tu Nombre'}
${profesional.contacto || ''}
${profesional.alias ? `Alias transferencia: ${profesional.alias}` : ''}`;

    return encodeURIComponent(mensaje);
  };

  const handleWhatsApp = (type: 'text' | 'pdf') => {
    const phone = cliente.telefono?.replace(/\D/g, '') || '';
    
    if (type === 'text') {
      window.open(`https://wa.me/${phone}?text=${getWhatsAppMessage()}`, '_blank');
    } else {
      handleDownloadPDF().then(() => {
        window.open(`https://wa.me/${phone}?text=${getWhatsAppMessage()}`, '_blank');
      });
    }
    setShowShareOptions(false);
  };

  return (
    <div className="space-y-6">
      <div className="lg:grid lg:grid-cols-3 lg:gap-6">
        {/* Preview */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <span className="material-symbols-outlined text-success">check_circle</span>
                Vista previa
              </div>
              <span className="text-xs text-slate-400">{items.length} items</span>
            </div>
            
            {/* Document - A4 */}
            <div ref={documentRef} className="bg-white border border-slate-200 rounded-lg p-4 md:p-6 overflow-auto" style={{ minHeight: 297 }}>
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  {profesional.logo ? (
                    <img src={profesional.logo} alt="Logo" className="w-10 h-10 object-contain" />
                  ) : (
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-lg">bolt</span>
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{profesional.nombre || 'Tu Nombre'}</h3>
                    <p className="text-xs text-slate-500">{profesional.profesion}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-1 bg-slate-900 text-white text-[10px] font-bold rounded">PRESUPUESTO</span>
                  <p className="text-[10px] text-slate-400 mt-1">SQ-{Date.now().toString().slice(-6)}</p>
                </div>
              </div>

              {/* Client */}
              <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Cliente</p>
                <p className="font-semibold text-slate-900 text-sm">{cliente.nombre || 'Sin nombre'}</p>
                {cliente.empresa && <p className="text-xs text-slate-600">{cliente.empresa}</p>}
                {cliente.telefono && <p className="text-xs text-slate-500">{cliente.telefono}</p>}
                {cliente.proyecto && <p className="text-xs text-primary mt-1"><strong>Proyecto:</strong> {cliente.proyecto}</p>}
              </div>

              {/* Items - Compact Table */}
              <div className="mb-4">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-300">
                      <th className="text-left py-1 font-semibold text-slate-700">Descripción</th>
                      <th className="text-right py-1 font-semibold text-slate-700">Importe</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(item => (
                      <tr key={item.id} className="border-b border-slate-100">
                        <td className="py-1.5 pr-2">
                          <p className="font-medium text-slate-900">{item.titulo}</p>
                          {item.descripcion && <p className="text-[10px] text-slate-500">{item.descripcion}</p>}
                        </td>
                        <td className="text-right py-1.5 font-medium text-slate-900">${item.precio.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="mb-4">
                <div className="flex justify-end">
                  <div className="w-40">
                    <div className="flex justify-between py-1 text-xs">
                      <span className="text-slate-500">Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    {config.ivaEnabled && (
                      <div className="flex justify-between py-1 text-xs">
                        <span className="text-slate-500">IVA ({config.iva}%)</span>
                        <span className="font-medium">${iva.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-1.5 px-2 bg-slate-900 -mx-2 text-white rounded">
                      <span className="font-bold text-xs">TOTAL</span>
                      <span className="font-bold">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Conditions Footer */}
              {(enabledConditions.length > 0 || config.condicionesCustom) && (
                <div className="pt-3 border-t border-slate-200 text-xs">
                  <p className="font-semibold text-slate-500 mb-1">Condiciones:</p>
                  <ul className="text-slate-600 space-y-0.5">
                    {enabledConditions.map(condition => (
                      <li key={condition.id}>• {condition.label}</li>
                    ))}
                    {config.condicionesCustom.split('\n').filter(l => l.trim()).map((line, idx) => (
                      <li key={idx}>{line}</li>
                    ))}
                  </ul>
                  <p className="text-slate-400 mt-2">Válido por {config.validez} días</p>
                </div>
              )}

              {/* Professional Footer */}
              <div className="pt-2 mt-2 border-t border-slate-100 text-center text-[10px] text-slate-400">
                {profesional.alias && <p>Alias: {profesional.alias}</p>}
                {profesional.matricula && <p>Mat: {profesional.matricula}</p>}
              </div>
            </div>
          </Card>
        </div>

        {/* Actions */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <h3 className="font-bold text-slate-900 mb-2">¡Listo!</h3>
            <p className="text-sm text-slate-500 mb-4">Guarda y comparte tu presupuesto</p>
            
            <div className="space-y-3">
              <Button variant="primary" fullWidth onClick={handleSaveQuote}>
                <span className="material-symbols-outlined">save</span>
                Guardar
              </Button>
              
              <div className="relative">
                <Button variant="whatsapp" fullWidth onClick={() => setShowShareOptions(!showShareOptions)}>
                  <span className="material-symbols-outlined">send</span>
                  Enviar WhatsApp
                </Button>
                
                {showShareOptions && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden z-10">
                    <button onClick={() => handleWhatsApp('text')} className="w-full px-4 py-3 text-left hover:bg-slate-50 flex items-center gap-3">
                      <span className="material-symbols-outlined text-green-500">chat</span>
                      <span className="text-sm">Solo texto</span>
                    </button>
                    <button onClick={() => handleWhatsApp('pdf')} className="w-full px-4 py-3 text-left hover:bg-slate-50 flex items-center gap-3">
                      <span className="material-symbols-outlined text-red-500">picture_as_pdf</span>
                      <span className="text-sm">Con PDF</span>
                    </button>
                  </div>
                )}
              </div>

              <Button variant="secondary" fullWidth onClick={handleDownloadPDF} disabled={isGenerating}>
                <span className="material-symbols-outlined">download</span>
                {isGenerating ? 'Generando...' : 'Descargar PDF'}
              </Button>
              
              <Button variant="ghost" fullWidth onClick={() => goToStep(1)}>
                <span className="material-symbols-outlined">edit</span>
                Editar
              </Button>
            </div>
          </Card>

          <Card className="bg-blue-50 border-blue-100">
            <div className="flex gap-3">
              <span className="material-symbols-outlined text-primary">lightbulb</span>
              <div>
                <p className="font-medium text-slate-900 text-sm">Consejo</p>
                <p className="text-xs text-slate-500 mt-1">El mensaje de WhatsApp incluye todas las condiciones.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
