import React, { useState, useMemo } from 'react';
import { useQuoteStore } from '../../store/useQuoteStore';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import type { Quote } from '../../types';
import Logo from '../../assets/logo-presspuesto_2.svg';

type StatusFilter = 'all' | Quote['status'];
type QuoteStatus = Quote['status'];

interface DashboardProps {
  onNewQuote: () => void;
  onLoadQuote: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNewQuote, onLoadQuote }) => {
  const { quotes, deleteQuote, loadQuote, updateQuoteStatus } = useQuoteStore();
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [openStatusMenu, setOpenStatusMenu] = useState<string | null>(null);

  const metrics = useMemo(() => {
    const total = quotes.reduce((sum, q) => sum + q.total, 0);
    const count = quotes.length;
    const average = count > 0 ? total / count : 0;
    const pending = quotes.filter(q => q.status === 'pending').length;
    const approved = quotes.filter(q => q.status === 'approved').length;
    const rejected = quotes.filter(q => q.status === 'rejected').length;
    return { total, count, average, pending, approved, rejected };
  }, [quotes]);

  const filteredQuotes = useMemo(() => {
    if (statusFilter === 'all') return quotes;
    return quotes.filter(q => q.status === statusFilter);
  }, [quotes, statusFilter]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-AR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusConfig = (status: QuoteStatus) => {
    switch (status) {
      case 'approved':
        return {
          color: 'text-green-400 bg-green-500/10 border-green-500/30',
          bgHover: 'hover:bg-green-500/20',
          icon: 'check_circle',
          label: 'Aprobado'
        };
      case 'pending':
        return {
          color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
          bgHover: 'hover:bg-yellow-500/20',
          icon: 'schedule',
          label: 'Pendiente'
        };
      case 'rejected':
        return {
          color: 'text-red-400 bg-red-500/10 border-red-500/30',
          bgHover: 'hover:bg-red-500/20',
          icon: 'cancel',
          label: 'Rechazado'
        };
    }
  };

  const handleStatusChange = (quoteId: string, status: QuoteStatus) => {
    updateQuoteStatus(quoteId, status);
    setOpenStatusMenu(null);
  };

  const filterButtons: { key: StatusFilter; label: string; count: number; color: string }[] = [
    { key: 'all', label: 'Todos', count: metrics.count, color: 'bg-slate-700 hover:bg-slate-600 text-slate-300' },
    { key: 'pending', label: 'Pendientes', count: metrics.pending, color: 'bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400' },
    { key: 'approved', label: 'Aprobados', count: metrics.approved, color: 'bg-green-500/20 hover:bg-green-500/30 text-green-400' },
    { key: 'rejected', label: 'Rechazados', count: metrics.rejected, color: 'bg-red-500/20 hover:bg-red-500/30 text-red-400' },
  ];

  return (
    <div className="space-y-6">
      <div className="lg:hidden flex justify-center py-4">
        <img src={Logo} alt="Presspuesto Logo" className="w-32" />
      </div>

      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.4s ease-out forwards;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
      `}</style>

      <div className="flex items-center justify-between animate-slide-up opacity-0">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 font-display">Dashboard</h2>
          <p className="text-slate-500">Resumen de tus cotizaciones</p>
        </div>
        <button onClick={onNewQuote} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-blue-500 transition-colors shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined">add</span>
          Nuevo
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 animate-slide-up opacity-0 delay-100">
        <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700/50 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30">
              <span className="material-symbols-outlined text-primary">payments</span>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide">Total Presupuestado</p>
              <p className="text-lg font-bold text-white">{formatCurrency(metrics.total)}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700/50 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center border border-accent/30">
              <span className="material-symbols-outlined text-accent">description</span>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide">Cotizaciones</p>
              <p className="text-lg font-bold text-white">{metrics.count}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700/50 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center border border-purple-500/30">
              <span className="material-symbols-outlined text-purple-400">trending_up</span>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide">Promedio</p>
              <p className="text-lg font-bold text-white">{formatCurrency(metrics.average)}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700/50 p-4">
          <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Por Estado</p>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
              <span className="text-slate-400">{metrics.pending}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-400"></span>
              <span className="text-slate-400">{metrics.approved}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-400"></span>
              <span className="text-slate-400">{metrics.rejected}</span>
            </div>
          </div>
          <div className="flex gap-1 mt-2">
            <div className="flex-1 h-1.5 rounded-full bg-yellow-400/50" style={{ width: metrics.count > 0 ? `${(metrics.pending / metrics.count) * 100}%` : '0%', minWidth: metrics.pending > 0 ? '8px' : '0' }} />
            <div className="flex-1 h-1.5 rounded-full bg-green-400/50" style={{ width: metrics.count > 0 ? `${(metrics.approved / metrics.count) * 100}%` : '0%', minWidth: metrics.approved > 0 ? '8px' : '0' }} />
            <div className="flex-1 h-1.5 rounded-full bg-red-400/50" style={{ width: metrics.count > 0 ? `${(metrics.rejected / metrics.count) * 100}%` : '0%', minWidth: metrics.rejected > 0 ? '8px' : '0' }} />
          </div>
        </Card>
      </div>

      <div className="animate-slide-up opacity-0 delay-200">
        <div className="flex items-center gap-2 mb-3">
          <span className="material-symbols-outlined text-slate-500">filter_list</span>
          <span className="text-sm font-medium text-slate-400">Filtrar por estado</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {filterButtons.map(btn => (
            <button
              key={btn.key}
              onClick={() => setStatusFilter(btn.key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${btn.color} ${statusFilter === btn.key ? 'ring-2 ring-white/20 ring-offset-2 ring-offset-slate-900' : ''}`}
            >
              {btn.label}
              <span className="ml-2 px-2 py-0.5 bg-white/10 rounded-full text-xs">
                {btn.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="animate-slide-up opacity-0 delay-300">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-300">
            Cotizaciones
            {statusFilter !== 'all' && (
              <span className="ml-2 text-sm text-slate-500 font-normal">
                ({filteredQuotes.length} {statusFilter === 'pending' ? 'pendientes' : statusFilter === 'approved' ? 'aprobadas' : 'rechazadas'})
              </span>
            )}
          </h3>
        </div>

        {filteredQuotes.length === 0 ? (
          <Card className="text-center py-12">
            <span className="material-symbols-outlined text-5xl text-slate-600 mb-4">description</span>
            <h3 className="text-lg font-semibold text-slate-300 mb-2">
              {statusFilter === 'all' ? 'Sin cotizaciones' : `Sin cotizaciones ${statusFilter === 'pending' ? 'pendientes' : statusFilter === 'approved' ? 'aprobadas' : 'rechazadas'}`}
            </h3>
            <p className="text-slate-500 text-sm mb-4">
              {statusFilter === 'all' ? 'Crea tu primera cotización' : 'Cambia el filtro o crea una nueva'}
            </p>
            <Button onClick={onNewQuote}>
              Crear Cotización
            </Button>
          </Card>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {filteredQuotes.map(quote => {
              const statusConfig = getStatusConfig(quote.status);
              return (
                <Card key={quote.id} className={`hover:bg-slate-800/80 transition-all ${statusConfig.bgHover} relative`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-100 truncate">{quote.cliente.proyecto || 'Sin proyecto'}</h4>
                      <p className="text-sm text-slate-500 truncate">{quote.cliente.nombre || 'Sin cliente'}</p>
                    </div>
                    
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenStatusMenu(openStatusMenu === quote.id ? null : quote.id);
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${statusConfig.color} hover:scale-105`}
                      >
                        <span className="material-symbols-outlined text-sm">{statusConfig.icon}</span>
                        {statusConfig.label}
                        <span className="material-symbols-outlined text-xs">expand_more</span>
                      </button>
                      
                      {openStatusMenu === quote.id && (
                        <div 
                          className="absolute top-full right-0 mt-2 w-44 bg-slate-800 rounded-xl shadow-xl border border-slate-700 overflow-hidden z-[60]"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStatusChange(quote.id, 'pending');
                            }}
                            className="w-full px-4 py-2.5 text-left hover:bg-yellow-500/20 flex items-center gap-3 transition-colors"
                          >
                            <span className="material-symbols-outlined text-yellow-400 text-lg">schedule</span>
                            <span className="text-sm text-slate-300">Pendiente</span>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStatusChange(quote.id, 'approved');
                            }}
                            className="w-full px-4 py-2.5 text-left hover:bg-green-500/20 flex items-center gap-3 transition-colors"
                          >
                            <span className="material-symbols-outlined text-green-400 text-lg">check_circle</span>
                            <span className="text-sm text-slate-300">Aprobado</span>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStatusChange(quote.id, 'rejected');
                            }}
                            className="w-full px-4 py-2.5 text-left hover:bg-red-500/20 flex items-center gap-3 transition-colors"
                          >
                            <span className="material-symbols-outlined text-red-400 text-lg">cancel</span>
                            <span className="text-sm text-slate-300">Rechazado</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <span className="material-symbols-outlined text-sm">calendar_today</span>
                        {formatDate(quote.createdAt)}
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <span className="material-symbols-outlined text-sm">receipt_long</span>
                        {quote.items.length} items
                      </div>
                    </div>
                    <p className="text-lg font-bold text-primary">{formatCurrency(quote.total)}</p>
                  </div>

                  <div className="flex gap-2 mt-3 pt-3 border-t border-slate-700/50">
                    <button
                      onClick={() => {
                        loadQuote(quote);
                        onLoadQuote();
                      }}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                    >
                      <span className="material-symbols-outlined text-base">visibility</span>
                      Ver
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('¿Eliminar esta cotización?')) {
                          deleteQuote(quote.id);
                        }
                      }}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <span className="material-symbols-outlined text-base">delete</span>
                      Eliminar
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {openStatusMenu && (
        <div
          className="fixed inset-0 z-50"
          onClick={(e) => {
            e.stopPropagation();
            setOpenStatusMenu(null);
          }}
        />
      )}
    </div>
  );
};
