import React from 'react';

export const Footer = () => {
    return (
        <footer className="py-12 px-6 md:px-12 bg-neutral-950 text-white">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
                <div className="col-span-1 md:col-span-2">
                    <img
                        src="/images/logos/luanails-logo-confondo.png"
                        alt="LUA SPA Logo"
                        className="h-20 md:h-24 w-auto object-contain mb-8 ml-4 rounded-full"
                    />
                    <p className="max-w-md text-neutral-400">
                        Cuidado, belleza y estilo en cada detalle.
                    </p>
                </div>

                <div>
                    <h4 className="font-mono text-sm text-neutral-500 mb-6 uppercase tracking-wider">Redes</h4>
                    <ul className="space-y-4">
                        <li><a href="https://www.instagram.com/luanails_kb?igsh=MXQzeWZvNmJqNTM3ag==" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors cursor-scale">Instagram</a></li>
                        <li><a href="https://wa.me/584122732426" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors cursor-scale">WhatsApp</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-mono text-sm text-neutral-500 mb-6 uppercase tracking-wider">Contacto</h4>
                    <ul className="space-y-4">
                        <li><a href="mailto:Luanailskb@gmail.com" className="hover:text-gold transition-colors cursor-scale">Luanailskb@gmail.com</a></li>
                        <li><a href="https://wa.me/584122732426" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors cursor-scale">+58 412-2732426</a></li>
                    </ul>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center pt-8 pb-20 md:pb-0 md:pr-[120px] border-t border-white/10 text-sm text-neutral-600">
                <p>© 2026 LuaNails. Todos los derechos reservados.</p>
                <div className="flex flex-col items-center gap-1.5 md:flex-row md:gap-2 mt-4 md:mt-0 text-neutral-500 font-bold text-[10px] md:text-xs uppercase tracking-widest">
                    <span>Desarrollado y Diseñado por</span>
                    <a 
                        href="https://carmidev.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative h-[19px] group/logo cursor-pointer shrink-0 block"
                    >
                        <style>{`
                            @keyframes neonGlowPulse {
                                0%, 100% {
                                    filter: brightness(0) saturate(100%) invert(67%) sepia(93%) saturate(3020%) hue-rotate(150deg) brightness(105%) contrast(106%) drop-shadow(0 0 2px rgba(0, 229, 255, 0.5));
                                }
                                50% {
                                    filter: brightness(0) saturate(100%) invert(67%) sepia(93%) saturate(3020%) hue-rotate(150deg) brightness(105%) contrast(106%) drop-shadow(0 0 8px rgba(0, 229, 255, 0.95));
                                }
                            }
                            .carmidev-logo-hover {
                                animation: neonGlowPulse 2s infinite ease-in-out;
                            }
                        `}</style>
                        <img
                            src="/images/logo-carmidev.png"
                            alt="CarMiDev Logo"
                            className="h-[19px] w-auto object-contain opacity-100 transition-opacity duration-300 group-hover/logo:opacity-0"
                        />
                        <img
                            src="/images/logo-carmidev.png"
                            alt="CarMiDev Hover"
                            className="carmidev-logo-hover absolute inset-0 w-full h-full object-contain opacity-0 transition-opacity duration-300 group-hover/logo:opacity-100"
                        />
                    </a>
                </div>
            </div>
        </footer>
    );
};
