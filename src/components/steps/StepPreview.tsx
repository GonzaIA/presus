import React from 'react';
import { useQuoteStore } from '../../store/useQuoteStore';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

export const StepPreview: React.FC = () => {
  const { profesional, cliente, items, config, goToStep } = useQuoteStore();
  
  const calcularTotal = () => {
    const subtotal = items.reduce((sum, item) => sum + item.precio, 0);
    const iva = subtotal * (config.iva / 100);
    return { subtotal, iva, total: subtotal + iva };
  };

  const { subtotal, iva, total } = calcularTotal();

  const handleWhatsApp = () => {
    const mensaje = `Hola ${cliente.nombre || 'Cliente'},\n\nPresupuesto para: "${cliente.proyecto || 'Sin título'}".\n\nTotal: $${total.toFixed(2)}\n\nSaludos,\n${profesional.nombre || 'Tu Nombre'}`;
    const encodedMessage = encodeURIComponent(mensaje);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="lg:grid lg:grid-cols-3 lg:gap-6">
        {/* Preview */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center gap-2 mb-4 text-sm text-slate-500">
              <span className="material-symbols-outlined text-success">check_circle</span>
              Vista previa
            </div>
            
            {/* Document */}
            <div className="bg-white border border-slate-200 rounded-lg p-6" style={{ aspectRatio: '1/1.414' }}>
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  {profesional.logo ? (
                    <img src={profesional.logo} alt="Logo" className="w-12 h-12 object-contain mb-2" />
                  ) : (
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-2">
                      <span className="material-symbols-outlined text-white text-xl">bolt</span>
                    </div>
                  )}
                  <h3 className="font-bold text-slate-900">{profesional.nombre || 'Tu Nombre'}</h3>
                  <p className="text-xs text-slate-500">{profesional.profesion}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 bg-slate-900 text-white text-xs font-bold rounded-full">PRESUPUESTO</span>
                  <p className="text-xs text-slate-400 mt-1">SQ-{Date.now().toString().slice(-6)}</p>
                </div>
              </div>

              {/* Client */}
              <div className="mb-6 p-3 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Cliente</p>
                <p className="font-medium text-slate-900">{cliente.nombre || 'Sin nombre'}</p>
                {cliente.proyecto && <p className="text-sm text-slate-500">{cliente.proyecto}</p>}
              </div>

              {/* Items */}
              <div className="mb-6 space-y-2">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between py-2 border-b border-slate-100">
                    <div>
                      <p className="font-medium text-slate-900">{item.titulo}</p>
                      {item.descripcion && <p className="text-xs text-slate-500">{item.descripcion}</p>}
                    </div>
                    <p className="font-medium text-slate-900">${item.precio.toFixed(2)}</p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="pt-4 border-t border-slate-200">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-500">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-500">IVA ({config.iva}%)</span>
                  <span>${iva.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 bg-slate-900 -mx-6 px-6 -mb-6 mt-2 rounded-b-lg">
                  <span className="font-bold text-white">TOTAL</span>
                  <span className="font-bold text-white text-lg">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Actions */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <h3 className="font-bold text-slate-900 mb-2">¡Listo!</h3>
            <p className="text-sm text-slate-500 mb-4">Revisa y envía tu presupuesto</p>
            
            <div className="space-y-3">
              <Button variant="whatsapp" fullWidth onClick={handleWhatsApp}>
                <span className="material-symbols-outlined">send</span>
                Enviar por WhatsApp
              </Button>
              <Button variant="secondary" fullWidth>
                <span className="material-symbols-outlined">download</span>
                Descargar PDF
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
                <p className="text-xs text-slate-500 mt-1">Envía por WhatsApp para mayor velocidad de respuesta.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
