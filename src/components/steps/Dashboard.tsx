import React from 'react';
import { useQuoteStore } from '../../store/useQuoteStore';
import { Card } from '../ui/Card';

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
      case 'approved': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-slate-600 bg-slate-100';
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
          <h2 className="text-2xl font-bold text-slate-900 font-display">Mis Cotizaciones</h2>
          <p className="text-slate-500">{quotes.length} presupuestos guardados</p>
        </div>
        <button onClick={onNewQuote} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors">
          <span className="material-symbols-outlined">add</span>
          Nuevo
        </button>
      </div>

      {quotes.length === 0 ? (
        <Card className="text-center py-12">
          <span className="material-symbols-outlined text-5xl text-slate-300 mb-4">description</span>
          <h3 className="text-lg font-semibold text-slate-700 mb-2">Sin cotizaciones</h3>
          <p className="text-slate-500 text-sm mb-4">Crea tu primera cotización</p>
          <button onClick={onNewQuote} className="px-5 py-2.5 bg-primary text-white rounded-xl font-medium">
            Crear Cotización
          </button>
        </Card>
      ) : (
        <div className="grid gap-4">
          {quotes.map(quote => (
            <Card key={quote.id} className="hover:shadow-soft transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-slate-900">{quote.cliente.proyecto || 'Sin proyecto'}</h4>
                  <p className="text-sm text-slate-500">{quote.cliente.nombre || 'Sin cliente'}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(quote.status)}`}>
                  {getStatusLabel(quote.status)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-xs text-slate-400">Fecha</p>
                    <p className="text-sm font-medium text-slate-700">{formatDate(quote.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Items</p>
                    <p className="text-sm font-medium text-slate-700">{quote.items.length}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Total</p>
                    <p className="text-lg font-bold text-primary">${quote.total.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => loadQuote(quote)} className="p-2 text-slate-400 hover:text-primary hover:bg-slate-100 rounded-lg">
                    <span className="material-symbols-outlined">visibility</span>
                  </button>
                  <button onClick={() => deleteQuote(quote.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg">
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
