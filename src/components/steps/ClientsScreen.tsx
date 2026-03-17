import React from 'react';
import { useQuoteStore } from '../../store/useQuoteStore';
import { Card } from '../ui/Card';

interface ClientsScreenProps {
  onLoadQuote: (quoteId: string) => void;
}

export const ClientsScreen: React.FC<ClientsScreenProps> = ({ onLoadQuote }) => {
  const { quotes } = useQuoteStore();

  const sortedQuotes = [...quotes].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('es-AR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const calculateTotal = (quote: typeof quotes[0]) => {
    const subtotal = quote.items.reduce((sum, item) => sum + item.precio, 0);
    const iva = quote.config.ivaEnabled ? subtotal * (quote.config.iva / 100) : 0;
    return subtotal + iva;
  };

  return (
    <div className="min-h-[calc(100vh-140px)] p-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
          <span className="material-symbols-outlined text-primary">group</span>
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900">Mis Clientes</h1>
          <p className="text-xs text-slate-500">{quotes.length} presupuestos guardados</p>
        </div>
      </div>

      {quotes.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-slate-400 text-3xl">person_off</span>
          </div>
          <h3 className="font-semibold text-slate-700 mb-2">Sin clientes aún</h3>
          <p className="text-sm text-slate-500">Crea tu primer presupuesto para ver tus clientes aquí</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedQuotes.map((quote) => (
            <Card 
              key={quote.id} 
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onLoadQuote(quote.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {(quote.cliente.nombre || 'C')[0].toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">
                      {quote.cliente.nombre || 'Sin nombre'}
                    </h4>
                    {quote.cliente.empresa && (
                      <p className="text-xs text-slate-500">{quote.cliente.empresa}</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">${calculateTotal(quote).toFixed(2)}</p>
                  <p className="text-xs text-slate-400">{formatDate(quote.createdAt)}</p>
                </div>
              </div>
              {quote.cliente.proyecto && (
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <p className="text-xs text-slate-500">
                    <span className="font-medium">Proyecto:</span> {quote.cliente.proyecto}
                  </p>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
