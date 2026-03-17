import React from 'react';

interface NewQuoteScreenProps {
  onStartNew: () => void;
}

export const NewQuoteScreen: React.FC<NewQuoteScreenProps> = ({ onStartNew }) => {
  return (
    <div className="min-h-[calc(100vh-140px)] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm mx-auto">
        {/* Solid background card */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          {/* Image placeholder with color overlay */}
          <div className="relative h-48 bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
            <div className="relative z-10 text-center">
              <span className="material-symbols-outlined text-white/30 text-6xl">image</span>
              <p className="text-white/50 text-xs mt-2">Tu imagen aquí</p>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6 text-center">
            <h2 className="text-xl font-bold text-white mb-2">Nuevo Presupuesto</h2>
            <p className="text-white/70 text-sm mb-6">
              Crea un presupuesto personalizado para tu cliente
            </p>
            
            <button 
              onClick={onStartNew}
              className="w-full py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-xl">add</span>
              Comenzar
            </button>
          </div>
        </div>
        
        {/* Tips */}
        <div className="mt-6 space-y-2">
          <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-green-600 text-sm">check_circle</span>
            </div>
            <p className="text-xs text-slate-600">Datos guardados automáticamente</p>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-blue-600 text-sm">share</span>
            </div>
            <p className="text-xs text-slate-600">Envía por WhatsApp al instante</p>
          </div>
        </div>
      </div>
    </div>
  );
};
