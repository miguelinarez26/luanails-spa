import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
    const [phone, setPhone] = useState("+58 ");

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-dark/60 backdrop-blur-sm"
                />

                {/* Modal Content */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 overflow-hidden max-h-[90vh] overflow-y-auto scrollbar-hide"
                >
                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-gold to-transparent" />
                    
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-dark transition-colors rounded-full hover:bg-gray-100 cursor-pointer z-10"
                    >
                        <X size={24} />
                    </button>

                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-heading font-medium mb-2 text-dark">Agendar Cita</h2>
                        <p className="text-gray-500 text-sm">Déjanos cuidar de ti. Completa tus datos.</p>
                    </div>

                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-2">
                            <label className="text-xs font-bold tracking-widest uppercase text-gray-500">Nombre Completo</label>
                            <input 
                                type="text" 
                                placeholder="Tu nombre"
                                className="w-full border-b border-gray-300 py-2 focus:border-gold focus:outline-none transition-colors bg-transparent font-medium"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold tracking-widest uppercase text-gray-500">Servicio</label>
                            <select className="w-full border-b border-gray-300 py-2 focus:border-gold focus:outline-none transition-colors bg-transparent font-medium">
                                <option>Manicura</option>
                                <option>Pedicura</option>
                                <option>Nail Art</option>
                                <option>Spa Completo</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold tracking-widest uppercase text-gray-500">Fecha</label>
                                <input 
                                    type="date" 
                                    className="w-full border-b border-gray-300 py-2 focus:border-gold focus:outline-none transition-colors bg-transparent font-medium"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold tracking-widest uppercase text-gray-500">Hora</label>
                                <select className="w-full border-b border-gray-300 py-2 focus:border-gold focus:outline-none transition-colors bg-transparent font-medium">
                                    <option>09:00 AM</option>
                                    <option>10:00 AM</option>
                                    <option>11:00 AM</option>
                                    <option>12:00 PM</option>
                                    <option>02:00 PM</option>
                                    <option>03:00 PM</option>
                                    <option>04:00 PM</option>
                                    <option>05:00 PM</option>
                                    <option>06:00 PM</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold tracking-widest uppercase text-gray-500">WhatsApp / Teléfono</label>
                            <input 
                                type="tel" 
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full border-b border-gray-300 py-2 focus:border-gold focus:outline-none transition-colors bg-transparent font-medium"
                            />
                        </div>

                        <button className="w-full bg-gold text-white py-4 rounded-full font-bold tracking-widest uppercase hover:opacity-90 transition-opacity shadow-lg mt-4 cursor-pointer">
                            Confirmar Reserva
                        </button>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};