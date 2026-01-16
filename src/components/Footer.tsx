import React from 'react';

export const Footer = () => {
    return (
        <footer className="py-12 px-6 md:px-12 bg-neutral-950 text-white">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
                <div className="col-span-1 md:col-span-2">
                    <img
                        src="https://bkylyjjnrthoxbeculgk.supabase.co/storage/v1/object/public/media/logo%20luaspa.webp"
                        alt="LUA SPA Logo"
                        className="h-12 md:h-14 w-auto object-contain mb-8 scale-[2.5] origin-left ml-4"
                    />
                    <p className="max-w-md text-neutral-400">
                        Diseño, Tecnología y Cuidado Japonés.
                        Establecido en Playground City, trabajando localmente.
                    </p>
                </div>

                <div>
                    <h4 className="font-mono text-sm text-neutral-500 mb-6 uppercase tracking-wider">Redes</h4>
                    <ul className="space-y-4">
                        <li><a href="#" className="hover:text-gold transition-colors cursor-scale">Instagram</a></li>
                        <li><a href="#" className="hover:text-gold transition-colors cursor-scale">WhatsApp</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-mono text-sm text-neutral-500 mb-6 uppercase tracking-wider">Contacto</h4>
                    <ul className="space-y-4">
                        <li><a href="#" className="hover:text-gold transition-colors cursor-scale">concierge@luaspa.com</a></li>
                        <li><a href="#" className="hover:text-gold transition-colors cursor-scale">+1 234 567 890</a></li>
                    </ul>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-sm text-neutral-600">
                <p>© 2026 Lua Spa by Gemini. Todos los derechos reservados.</p>
                <div className="flex gap-4 mt-4 md:mt-0">
                    <a href="/legacy/index.html" className="hover:text-white transition-colors cursor-scale">Sitio Anterior</a>
                    <a href="/public/dashboard.html" className="hover:text-white transition-colors cursor-scale">Panel Admin</a>
                </div>
            </div>
        </footer>
    );
};
