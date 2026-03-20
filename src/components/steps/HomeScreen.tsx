import React from 'react';
import Logo from '../../assets/logo-presspuesto_2.svg';

interface HomeScreenProps {
  onNewQuote: () => void;
  onViewClients: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNewQuote, onViewClients }) => {
  return (
    <div className="min-h-[calc(100vh-140px)] flex flex-col items-center justify-center p-6">
      <div className="relative w-full max-w-sm mx-auto">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-purple-600 rounded-3xl opacity-90 animate-pulse" style={{ animationDuration: '3s' }} />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent rounded-3xl" />
        
        {/* Content */}
        <div className="relative z-10 p-8 text-center">
          {/* Logo */}
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
            <img src={Logo} alt="Presspuesto Logo" className="w-full h-full object-contain p-2" />
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-3 font-display">Presspuesto</h1>
          <p className="text-white/90 text-sm leading-relaxed mb-8">
            Crea presupuestos profesionales y envíalos en el momento. 
            Sorprende a tus clientes con presentación impecable.
          </p>
          
          {/* Action Buttons */}
          <div className="space-y-3">
            <button 
              onClick={onNewQuote}
              className="w-full py-4 bg-white text-primary font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">add_circle</span>
              Nuevo Presupuesto
            </button>
            
            <button 
              onClick={onViewClients}
              className="w-full py-3 bg-white/20 backdrop-blur-sm text-white font-medium rounded-2xl hover:bg-white/30 transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">group</span>
              Mis Clientes
            </button>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="mt-8 flex items-center gap-2 text-white/60 text-xs">
        <span className="w-2 h-2 bg-white/60 rounded-full animate-pulse" />
        <span>Hecho para profesionales</span>
        <span className="w-2 h-2 bg-white/60 rounded-full animate-pulse" />
      </div>
    </div>
  );
};
