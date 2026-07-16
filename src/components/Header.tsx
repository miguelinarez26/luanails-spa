import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {}

export const Header = ({}: HeaderProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navLinks = [
        { name: "Inicio", href: "/", active: true },
        { name: "Servicios", href: "/servicios", active: false },
        { name: "Quiénes somos", href: "/#quienes-somos", active: false }
    ];

    const whatsappUrl = "https://wa.me/584122732426";

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#1e1d1a] transition-all duration-300">
                {/* Logo Section */}
                <div className="flex items-center z-50 w-16 md:w-20 ml-4" />

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className={`text-[11px] tracking-[3px] uppercase text-[#B4B2A9] hover:text-[#C9BFA4] transition-colors duration-200 pb-1 ${link.active ? 'border-b border-[#C9BFA4]' : ''}`}
                        >
                            {link.name}
                        </a>
                    ))}
                </nav>

                {/* CTA Button & Mobile Menu Toggle */}
                <div className="flex items-center gap-4 z-50">
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:block border border-[#C9BFA4] text-[#C9BFA4] px-6 py-2 rounded-[999px] text-sm font-medium tracking-wide hover:bg-[#C9BFA4] hover:text-[#1e1d1a] transition-all duration-300 cursor-pointer cursor-scale"
                    >
                        AGENDAR CITA
                    </a>

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
                        className="fixed inset-0 z-40 bg-[#1e1d1a]/95 backdrop-blur-md flex flex-col items-center justify-center space-y-8 md:hidden text-center"
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={toggleMenu}
                                className="text-2xl font-heading text-[#FAF7F0] hover:text-[#C9BFA4] transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={toggleMenu}
                            className="border border-[#C9BFA4] text-[#C9BFA4] px-8 py-3 rounded-[999px] text-lg font-medium tracking-wide mt-8"
                        >
                            AGENDAR CITA
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
