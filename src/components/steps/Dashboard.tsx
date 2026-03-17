import React from 'react';
import { useQuoteStore } from '../../store/useQuoteStore';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface DashboardProps {
  onNewQuote: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNewQuote }) => {
  const { quotes, deleteQuote, loadQuote } = useQuoteStore();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-AR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-400 bg-green-500/10 border border-green-500/20';
      case 'pending': return 'text-yellow-400 bg-yellow-500/10 border border-yellow-500/20';
      case 'rejected': return 'text-red-400 bg-red-500/10 border border-red-500/20';
      default: return 'text-slate-400 bg-slate-800 border border-slate-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved': return 'Aprobado';
      case 'pending': return 'Pendiente';
      case 'rejected': return 'Rechazado';
      default: return 'Borrador';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 font-display">Mis Cotizaciones</h2>
          <p className="text-slate-500">{quotes.length} presupuestos guardados</p>
        </div>
        <button onClick={onNewQuote} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-blue-500 transition-colors shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined">add</span>
          Nuevo
        </button>
      </div>

      {quotes.length === 0 ? (
        <Card className="text-center py-12">
          <span className="material-symbols-outlined text-5xl text-slate-600 mb-4">description</span>
          <h3 className="text-lg font-semibold text-slate-300 mb-2">Sin cotizaciones</h3>
          <p className="text-slate-500 text-sm mb-4">Crea tu primera cotización</p>
          <Button onClick={onNewQuote}>
            Crear Cotización
          </Button>
        </Card>
      ) : (
        <div className="grid gap-4">
          {quotes.map(quote => (
            <Card key={quote.id} className="hover:bg-slate-800/80 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-slate-100">{quote.cliente.proyecto || 'Sin proyecto'}</h4>
                  <p className="text-sm text-slate-500">{quote.cliente.nombre || 'Sin cliente'}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(quote.status)}`}>
                  {getStatusLabel(quote.status)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-xs text-slate-500">Fecha</p>
                    <p className="text-sm font-medium text-slate-300">{formatDate(quote.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Items</p>
                    <p className="text-sm font-medium text-slate-300">{quote.items.length}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Total</p>
                    <p className="text-lg font-bold text-primary">${quote.total.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => loadQuote(quote)} className="p-2 text-slate-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                    <span className="material-symbols-outlined">visibility</span>
                  </button>
                  <button onClick={() => deleteQuote(quote.id)} className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
