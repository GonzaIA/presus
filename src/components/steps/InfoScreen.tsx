import React from 'react';

export const InfoScreen: React.FC = () => {
  return (
    <div className="relative min-h-[calc(100vh-140px)] overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-primary/30 to-accent/20 animate-gradient-shift" />
      
      {/* Animated Gradient Keyframes */}
      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 8s ease infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(3deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
        }
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
      `}</style>

      {/* Profile Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-[0.07] grayscale contrast-125"
        style={{ backgroundImage: `url('/asset/Gonza-perfil.jpg')` }}
      />

      {/* Radial Gradient Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-slate-900/80" />

      {/* Content Container */}
      <div className="relative z-10 p-6 max-w-lg mx-auto">
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-40 right-5 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-float delay-300" />

        {/* Header Section */}
        <div className="text-center mb-10 animate-slide-up opacity-0">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 mb-6">
            <span className="material-symbols-outlined text-primary text-lg">psychology</span>
            <span className="text-sm text-slate-300">Sobre el Proyecto</span>
          </div>
          
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 mb-4 font-display tracking-tight">
            Conoce el Proyecto
          </h1>
          
          <div className="w-20 h-1 bg-gradient-to-r from-primary via-accent to-primary mx-auto rounded-full animate-pulse-glow" />
        </div>

        {/* About Card */}
        <div className="bg-white/[0.03] backdrop-blur-xl rounded-3xl p-6 border border-white/10 mb-8 animate-slide-up opacity-0 delay-100">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/30">
              <span className="material-symbols-outlined text-white text-xl">auto_awesome</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-3">Sobre Presspuesto</h2>
              <p className="text-slate-300 leading-relaxed text-sm">
                Este proyecto gratuito fue realizado por <span className="text-primary font-semibold">Gonzalo Corales</span>, 
                Diseñador Gráfico y entusiasta del mundo tech.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 backdrop-blur-xl rounded-3xl p-6 border border-primary/20 mb-8 animate-slide-up opacity-0 delay-200">
          <div className="text-center">
            <span className="inline-block px-4 py-1.5 bg-primary/20 rounded-full text-white text-xs font-semibold mb-3">
              ¡Nuevo!
            </span>
            <h3 className="text-lg font-bold text-white mb-2">
              ¿Tienes ganas de que trabajemos juntos?
            </h3>
            <p className="text-slate-400 text-sm">
              ¡Comunícate y hagamos algo increíble!
            </p>
          </div>
        </div>

        {/* Contact Buttons */}
        <div className="space-y-4 animate-slide-up opacity-0 delay-300">
          
          {/* WhatsApp Button */}
          <a 
            href="https://wa.me/5492604358087?text=Hola%20Gonzalo!%20Me%20contacto%20desde%20Presspuesto"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-4 p-4 bg-gradient-to-r from-green-500/20 to-green-600/10 backdrop-blur-xl rounded-2xl border border-green-500/30 hover:border-green-400 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/10 to-green-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:scale-110 group-hover:shadow-green-500/50 transition-all duration-300">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-bold text-white group-hover:text-green-300 transition-colors">WhatsApp</p>
              <p className="text-xs text-slate-400">2604 35-8087</p>
            </div>
            <span className="material-symbols-outlined text-green-400 group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300">arrow_forward</span>
          </a>

          {/* Email Button */}
          <a 
            href="mailto:gonza.corales.ia@gmail.com?subject=Contacto%20desde%20Presspuesto"
            className="group relative flex items-center gap-4 p-4 bg-gradient-to-r from-blue-500/20 to-blue-600/10 backdrop-blur-xl rounded-2xl border border-blue-500/30 hover:border-blue-400 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 group-hover:shadow-blue-500/50 transition-all duration-300">
              <span className="material-symbols-outlined text-white text-xl">mail</span>
            </div>
            <div className="flex-1">
              <p className="font-bold text-white group-hover:text-blue-300 transition-colors">Correo</p>
              <p className="text-xs text-slate-400">gonza.corales.ia@gmail.com</p>
            </div>
            <span className="material-symbols-outlined text-blue-400 group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300">arrow_forward</span>
          </a>

          {/* LinkedIn Button */}
          <a 
            href="https://www.linkedin.com/in/gonzalocorales/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-4 p-4 bg-gradient-to-r from-sky-500/20 to-sky-600/10 backdrop-blur-xl rounded-2xl border border-sky-500/30 hover:border-sky-400 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-sky-500/0 via-sky-500/10 to-sky-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-sky-600 rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/30 group-hover:scale-110 group-hover:shadow-sky-500/50 transition-all duration-300">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-bold text-white group-hover:text-sky-300 transition-colors">LinkedIn</p>
              <p className="text-xs text-slate-400">Gonzalo Corales</p>
            </div>
            <span className="material-symbols-outlined text-sky-400 group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300">open_in_new</span>
          </a>

        </div>

        {/* Footer Decoration */}
        <div className="mt-10 text-center animate-slide-up opacity-0 delay-400">
          <div className="inline-flex items-center gap-2 text-slate-500 text-xs">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-slate-600" />
            <span>Hecho con</span>
            <span className="material-symbols-outlined text-red-400 text-sm animate-pulse">favorite</span>
            <span>en Argentina</span>
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-slate-600" />
          </div>
        </div>

      </div>
    </div>
  );
};
