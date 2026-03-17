import React from 'react';

export const InfoScreen: React.FC = () => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/542604358087?text=Hola%20Presspuesto', '_blank');
  };

  return (
    <div className="min-h-[calc(100vh-140px)] p-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
          <span className="material-symbols-outlined text-primary">info</span>
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-100">Acerca de Presspuesto</h1>
          <p className="text-xs text-slate-500">Tu herramienta de presupuestos</p>
        </div>
      </div>

      {/* App Info Card */}
      <div className="bg-gradient-to-br from-primary to-accent rounded-3xl p-6 text-white mb-6 shadow-lg shadow-primary/20">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-3xl">description</span>
          </div>
          <div>
            <h2 className="text-xl font-bold">Presspuesto</h2>
            <p className="text-white/80 text-sm">Versión 1.0.0</p>
          </div>
        </div>
        <p className="text-white/90 text-sm leading-relaxed">
          La herramienta definitiva para crear presupuestos profesionales 
          y enviarlos a tus clientes al instante vía WhatsApp.
        </p>
      </div>

      {/* Features */}
      <div className="space-y-3 mb-6">
        <h3 className="text-sm font-semibold text-slate-400 px-1">Características</h3>
        {[
          { icon: 'speed', title: 'Rápido', desc: 'Crea presupuestos en segundos' },
          { icon: 'palette', title: 'Profesional', desc: 'Diseño elegante y limpio' },
          { icon: 'send', title: 'Envío instantáneo', desc: 'Por WhatsApp directamente' },
          { icon: 'cloud', title: 'Siempre disponible', desc: 'Funciona sin internet' },
        ].map((feature) => (
          <div key={feature.title} className="flex items-center gap-3 p-3 bg-slate-800/70 backdrop-blur-md rounded-xl border border-white/10">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20">
              <span className="material-symbols-outlined text-primary">{feature.icon}</span>
            </div>
            <div>
              <p className="font-medium text-slate-100 text-sm">{feature.title}</p>
              <p className="text-xs text-slate-500">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Credits */}
      <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-4 mb-6 border border-white/10">
        <div className="flex items-center gap-2 mb-3">
          <span className="material-symbols-outlined text-slate-500">favorite</span>
          <h3 className="text-sm font-semibold text-slate-300">Creado para la comunidad</h3>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed">
          Presspuesto fue diseñado y desarrollado por <span className="font-semibold text-primary">Gonzalo Corales</span> 
          {' '}con el objetivo de ayudar a profesionales independientes y emprendedores 
          a presentar sus presupuestos de manera profesional.
        </p>
        <p className="text-xs text-slate-500 mt-3">
          ¡Compartilo con quien quieras! Hecho con ❤️ para toda la comunidad.
        </p>
      </div>

      {/* Contact */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-400 px-1">¿Necesitas ayuda?</h3>
        <button 
          onClick={handleWhatsApp}
          className="w-full p-4 bg-green-500 hover:bg-green-600 text-white rounded-2xl flex items-center justify-center gap-3 transition-colors shadow-lg shadow-green-500/20"
        >
          <span className="material-symbols-outlined text-2xl">chat</span>
          <div className="text-left">
            <p className="font-bold">Chatea con nosotros</p>
            <p className="text-xs text-white/80">Respondemos rápido</p>
          </div>
        </button>
      </div>
    </div>
  );
};
