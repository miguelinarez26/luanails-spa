"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Header } from '../../src/components/Header';
import { Footer } from '../../src/components/Footer';
import { Cursor } from '../../src/components/Cursor';

const categories = [
    {
        id: "manos",
        title: "Manos y Uñas",
        image: "/images/servicios/manos.png",
        items: [
            { name: "Semipermanentes", price: "15€" },
            { name: "Tradicional", price: "15€" },
            { name: "Esculpidas", price: "35€" },
            { name: "Kapping", price: "25€" },
            { name: "Manicura Rusa", price: "15€" },
            { name: "Soft Gel", price: "20€" },
            { name: "Nivelación Rubber", price: "20€" },
            { name: "Reparación de uña", price: "3€" },
        ]
    },
    {
        id: "pies",
        title: "Pies (Pedicura)",
        image: "/images/servicios/pies.png",
        items: [
            { name: "Pedicura Rusa", price: "15€" },
            { name: "Tradicional", price: "15€" },
            { name: "Semipermanentes", price: "15€" },
            { name: "Quiropedia", price: "20€" },
            { name: "Nivelación Rubber", price: "20€" },
            { name: "Reparación de uña", price: "3€" },
        ]
    },
    {
        id: "spa",
        title: "Terapias Spa",
        image: "/images/servicios/spa.png",
        items: [
            { name: "Chocolaterapia", price: "10€" },
            { name: "Parafina", price: "10€" },
            { name: "Veloterapia", price: "3€" },
            { name: "Guantes hidratantes", price: "10€" },
            { name: "Botas hidratantes", price: "10€" },
            { name: "Peeling de pies", price: "15€" },
        ]
    },
    {
        id: "depilacion",
        title: "Depilación Corporal",
        image: "/images/servicios/depilacion.png",
        items: [
            { name: "Corporal con cera", price: "Consultar" },
            { name: "Corporal con láser", price: "Consultar" },
        ]
    },
    {
        id: "masajes",
        title: "Spa Corporal y Masajes",
        image: "/images/servicios/masajes.png",
        items: [
            { name: "Masajes reductores", price: "Consultar" },
            { name: "Masajes relajantes", price: "Consultar" },
            { name: "Masajes linfáticos", price: "Consultar" },
        ]
    },
    {
        id: "cejas",
        title: "Cejas y Pestañas",
        image: "/images/servicios/cejas.png",
        items: [
            { name: "Diseño de cejas", price: "Consultar" },
            { name: "Pestañas pelo a pelo", price: "Consultar" },
            { name: "Lifting de pestañas", price: "Consultar" },
            { name: "Microblading", price: "Consultar" },
        ]
    }
];

export default function ServiciosPage() {
    return (
        <div className="min-h-screen bg-white text-dark font-sans selection:bg-black selection:text-white cursor-none">
            <Cursor />
            {/* El Header tiene bg transparente por defecto, le ponemos bg-white aquí indirectamente o lo dejamos que se acomode */}
            <Header />
            
            <main className="pt-32 pb-24 px-6 md:px-12 max-w-6xl mx-auto">
                <div className="text-center mb-20">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl font-medium tracking-tighter font-heading text-dark mb-6"
                    >
                        Catálogo de Servicios
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl md:text-2xl text-neutral-500 font-light max-w-2xl mx-auto"
                    >
                        Descubre nuestra selección de tratamientos diseñados para resaltar tu belleza natural y brindarte una experiencia de relajación total.
                    </motion.p>
                </div>

                <div className="space-y-32">
                    {categories.map((category, index) => (
                        <div key={category.id} id={category.id} className="scroll-mt-32">
                            <motion.div 
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start"
                            >
                                {/* Imagen de la categoría */}
                                <div className="w-full lg:w-5/12">
                                    <div className="relative aspect-[4/5] rounded-[2em] overflow-hidden shadow-2xl">
                                        <img 
                                            src={category.image} 
                                            alt={category.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-4 border border-white/30 rounded-[1.5em] pointer-events-none z-10" />
                                    </div>
                                </div>

                                {/* Lista de servicios */}
                                <div className="w-full lg:w-7/12 pt-4">
                                    <h2 className="text-4xl md:text-5xl font-heading font-medium mb-10 text-dark border-b border-neutral-200 pb-6">
                                        {category.title}
                                    </h2>
                                    
                                    <div className="space-y-6">
                                        {category.items.map((item, i) => (
                                            <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between group">
                                                <div className="flex-grow border-b border-dotted border-neutral-300 sm:mr-6 mb-2 sm:mb-0 pb-2 sm:pb-0">
                                                    <h3 className="text-2xl font-light text-dark tracking-wide">{item.name}</h3>
                                                </div>
                                                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                                                    <span className="font-mono text-2xl text-gold font-bold whitespace-nowrap">{item.price}</span>
                                                    <a 
                                                        href={`https://api.whatsapp.com/send?phone=584122732426&text=${encodeURIComponent(`¡Hola! 💅 Vengo de la página web y me gustaría agendar una cita para: *${item.name}*. ✨`)}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="px-5 py-2 rounded-full border border-dark text-dark text-xs font-bold uppercase tracking-widest hover:bg-dark hover:text-white transition-colors whitespace-nowrap cursor-pointer"
                                                    >
                                                        Reservar
                                                    </a>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
