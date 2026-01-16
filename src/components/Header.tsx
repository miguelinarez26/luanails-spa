import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
    onOpenBooking?: () => void;
}

export const Header = ({ onOpenBooking }: HeaderProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navLinks = [
        { name: "Inicio", href: "#" },
        { name: "Servicios", href: "#services" },
        { name: "Nosotros", href: "#intro" },
        { name: "Galería", href: "#projects" }
    ];

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300">
                {/* Logo Section */}
                <div className="flex items-center z-50">
                    <img
                        src="https://bkylyjjnrthoxbeculgk.supabase.co/storage/v1/object/public/media/logo%20luaspa.webp"
                        alt="LUA SPA Logo"
                        className="h-12 md:h-14 w-auto object-contain cursor-pointer drop-shadow-md scale-[2.5] origin-left ml-4"
                    />
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm font-bold tracking-widest uppercase hover:text-gold transition-colors duration-200 drop-shadow-md"
                        >
                            {link.name}
                        </a>
                    ))}
                </nav>

                {/* CTA Button & Mobile Menu Toggle */}
                <div className="flex items-center gap-4 z-50">
                    <button
                        onClick={onOpenBooking}
                        className="hidden md:block bg-gold text-white px-6 py-2 rounded-full text-sm font-medium tracking-wide hover:bg-white hover:text-dark transition-all duration-300 shadow-lg cursor-pointer cursor-scale"
                    >
                        AGENDAR CITA
                    </button>

                    <button
                        className="md:hidden p-2 text-white hover:text-gold transition-colors cursor-pointer"
                        onClick={toggleMenu}
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </header>

            {/* Mobile Navigation Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-dark/95 backdrop-blur-md flex flex-col items-center justify-center space-y-8 md:hidden text-center"
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={toggleMenu}
                                className="text-2xl font-heading text-white hover:text-gold transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                        <button
                            onClick={() => {
                                toggleMenu();
                                if (onOpenBooking) onOpenBooking();
                            }}
                            className="bg-gold text-white px-8 py-3 rounded-full text-lg font-medium tracking-wide mt-8"
                        >
                            AGENDAR CITA
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
