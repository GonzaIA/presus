import React, { useEffect, useState } from 'react';
import { useQuoteStore } from '../../store/useQuoteStore';
import Logo from '../../assets/logo-presspuesto_2.svg';

export const SplashScreen: React.FC = () => {
  const { goToStep } = useQuoteStore();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background-dark relative overflow-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 80px rgba(59, 130, 246, 0.6); }
        }
        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 20px rgba(6, 177, 211, 0.4)); }
          50% { filter: drop-shadow(0 0 40px rgba(59, 130, 246, 0.7)); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes dash-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .animate-glow { animation: glow 3s ease-in-out infinite; }
        .animate-slide-up { animation: slide-up 0.6s ease-out forwards; }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 8s ease infinite;
        }
        .animate-dash-float { animation: dash-float 4s ease-in-out infinite; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
      `}</style>

      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-primary/20 to-accent/10 animate-gradient-shift" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute top-40 right-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-float delay-300" />
      <div className="absolute bottom-40 left-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-float delay-500" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Hero */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 py-8">
          <div className="w-full max-w-md space-y-10">
            {/* Main Icon */}
            <div className={`text-center opacity-0 ${isLoaded ? 'animate-slide-up' : ''}`}>
              <img 
                src={Logo} 
                alt="Presspuesto Logo" 
                className="w-[300px] h-[300px] mx-auto object-contain animate-float animate-glow" 
              />
            </div>

            {/* Title & Description */}
            <div className={`text-center space-y-4 opacity-0 ${isLoaded ? 'animate-slide-up delay-100' : ''}`}>
              <h1 className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 font-display leading-tight tracking-tight">
                Crea Presupuestos<br/>
                <span className="text-primary">en Segundos</span>
              </h1>
              <p className="text-slate-400 text-lg leading-relaxed max-w-sm mx-auto">
                La herramienta definitiva para profesionales independientes. 
                Diseña cotizaciones hermosas y envíalas directo por WhatsApp.
              </p>
            </div>

            {/* Features Pills */}
            <div className={`flex flex-wrap justify-center gap-3 opacity-0 ${isLoaded ? 'animate-slide-up delay-200' : ''}`}>
              {[
                { icon: 'bolt', text: 'Rápido' },
                { icon: 'brush', text: 'Profesional' },
                { icon: 'send', text: 'WhatsApp' },
              ].map((feature) => (
                <div key={feature.text} className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
                  <span className="material-symbols-outlined text-primary text-lg">{feature.icon}</span>
                  <span className="text-sm text-slate-300 font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className={`grid grid-cols-2 gap-4 opacity-0 ${isLoaded ? 'animate-slide-up delay-300' : ''}`}>
              <div className="bg-white/[0.03] backdrop-blur-xl rounded-2xl p-5 border border-white/10 hover:border-primary/30 transition-all hover:scale-[1.02]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-warning/20 rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-warning text-xl">schedule</span>
                  </div>
                </div>
                <p className="text-3xl font-bold text-white mb-1">80%</p>
                <p className="text-sm text-slate-500">Menos tiempo en cotizaciones</p>
              </div>
              <div className="bg-white/[0.03] backdrop-blur-xl rounded-2xl p-5 border border-white/10 hover:border-green-500/30 transition-all hover:scale-[1.02]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-success/20 rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-success text-xl">trending_up</span>
                  </div>
                </div>
                <p className="text-3xl font-bold text-white mb-1">3x</p>
                <p className="text-sm text-slate-500">Más respuestas positivas</p>
              </div>
            </div>

            {/* Floating Document Preview */}
            <div className={`relative opacity-0 ${isLoaded ? 'animate-slide-up delay-400' : ''}`}>
              <div className="bg-white rounded-2xl p-4 shadow-2xl transform rotate-[-2deg] animate-dash-float">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-sm">bolt</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">PRESUPUESTO</p>
                    <p className="text-[10px] text-slate-500">SQ-123456</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-slate-200 rounded w-full" />
                  <div className="h-2 bg-slate-200 rounded w-3/4" />
                  <div className="h-2 bg-slate-200 rounded w-1/2" />
                </div>
                <div className="mt-3 pt-3 border-t border-slate-200">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500">Total</span>
                    <span className="text-sm font-bold text-primary">$125.000</span>
                  </div>
                </div>
              </div>
              {/* Floating WhatsApp badge */}
              <div className="absolute -right-4 -bottom-4 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 animate-float">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
            </div>

            {/* CTA Button */}
            <div className={`pt-4 opacity-0 ${isLoaded ? 'animate-slide-up delay-500' : ''}`}>
              <button
                onClick={() => goToStep(1)}
                className="w-full py-4 px-8 bg-gradient-to-r from-primary to-accent text-white font-bold text-lg rounded-2xl shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
              >
                <span className="material-symbols-outlined text-2xl">rocket_launch</span>
                Ingresar Gratis
              </button>
              <p className="text-center text-slate-500 text-sm mt-4">
                Sin registro • Sin límites • 100% gratuito
              </p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="px-6 pb-10">
          <div className="text-center">
            <p className="text-slate-600 text-sm">
              Hecho con <span className="text-red-400">❤</span> por Gonzalo Corales
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};
