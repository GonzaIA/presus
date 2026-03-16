import React from 'react';
import { useQuoteStore } from '../../store/useQuoteStore';
import { Button } from '../ui/Button';
import { ArrowLeft, Send, Download } from 'lucide-react';

export const StepPreview: React.FC = () => {
  const { profesional, cliente, items, config, goToStep } = useQuoteStore();
  
  const calcularTotal = () => {
    const subtotal = items.reduce((sum, item) => sum + item.precio, 0);
    const iva = subtotal * (config.iva / 100);
    return { subtotal, iva, total: subtotal + iva };
  };

  const { subtotal, iva, total } = calcularTotal();

  const handleWhatsApp = () => {
    const mensaje = `Hola ${cliente.nombre || 'Cliente'},\n\nAdjunto el presupuesto para el proyecto: "${cliente.proyecto || 'Sin título'}".\n\nTotal: $${total.toFixed(2)}\n\nSaludos,\n${profesional.nombre || 'Tu Nombre'}`;
    const encodedMessage = encodeURIComponent(mensaje);
    window.open(`https://wa.me/${cliente.nombre || ''}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Contenido Principal */}
      <main className="flex-1 px-4 py-4 flex flex-col items-center overflow-y-auto">
        {/* Hoja A4 Digital */}
        <div className="w-full bg-white dark:bg-slate-900 rounded-sm p-6 border border-slate-200 dark:border-slate-700 relative shadow-lg" style={{ aspectRatio: '1 / 1.414', maxHeight: '50vh' }}>
          {/* Encabezado */}
          <div className="flex justify-between items-start mb-6">
            <div>
              {profesional.logo && (
                <img src={profesional.logo} alt="Logo" className="w-12 h-12 object-contain mb-2" />
              )}
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {profesional.nombre || 'Tu Nombre'}
              </h2>
              <p className="text-xs text-slate-500">{profesional.profesion}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-primary uppercase">Presupuesto Oficial</p>
              <p className="text-[8px] text-slate-400">Ref: SQ-2024-001</p>
            </div>
          </div>

          {/* Datos Cliente */}
          <div className="mb-6 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase mb-1">Cliente</h3>
            <p className="text-sm font-medium">{cliente.nombre || 'Sin nombre'}</p>
            {cliente.direccion && <p className="text-xs text-slate-500">{cliente.direccion}</p>}
            {cliente.proyecto && <p className="text-xs text-slate-600 mt-1"><strong>Proyecto:</strong> {cliente.proyecto}</p>}
          </div>

          {/* Items */}
          <div className="flex-1">
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-start border-b border-slate-100 dark:border-slate-800 pb-2">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.titulo}</p>
                    {item.descripcion && <p className="text-[10px] text-slate-500">{item.descripcion}</p>}
                  </div>
                  <p className="text-sm font-medium">${item.precio.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Totales */}
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex justify-between text-xs text-slate-600 mb-1">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-600 mb-2">
              <span>IVA ({config.iva}%)</span>
              <span>${iva.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-slate-900 dark:text-white">TOTAL</span>
              <span className="font-bold text-primary">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">¡Todo listo!</h2>
          <p className="text-sm text-slate-500 mt-1">Revisa los detalles antes de enviar.</p>
        </div>
      </main>

      {/* Footer de Acción */}
      <footer className="p-4 space-y-3 bg-white dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800">
        <Button variant="whatsapp" fullWidth onClick={handleWhatsApp} icon={<Send size={18} />}>
          Enviar por WhatsApp
        </Button>
        <Button variant="secondary" fullWidth icon={<Download size={18} />}>
          Descargar PDF
        </Button>
        <div className="flex justify-center pt-2">
          <button 
            onClick={() => goToStep(1)}
            className="text-sm font-medium text-primary flex items-center gap-1"
          >
            <ArrowLeft size={14} />
            Editar cotización
          </button>
        </div>
      </footer>
    </div>
  );
};