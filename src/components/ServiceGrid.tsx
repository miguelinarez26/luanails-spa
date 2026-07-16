import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { GlowingEdgeCard } from './GlowingEdgeCard';

export const services = [
    {
        id: "manos",
        title: "Manos y Uñas",
        category: "Semipermanentes, Esculpidas, Kapping, Rusa y Soft Gel",
        price: "Desde 15€",
        image: "/images/servicios/manos.png"
    },
    {
        id: "pies",
        title: "Pies (Pedicura)",
        category: "Pedicura Rusa, Tradicional, Quiropedia y Spa",
        price: "Desde 15€",
        image: "/images/servicios/pies.png"
    },
    {
        id: "spa",
        title: "Terapias Spa",
        category: "Chocolaterapia, Parafina, Botas y Peeling",
        price: "Desde 10€",
        image: "/images/servicios/spa.png"
    },
    {
        id: "depilacion",
        title: "Depilación Corporal",
        category: "Depilación con cera y láser",
        price: "Consultar",
        image: "/images/servicios/depilacion.png"
    },
    {
        id: "masajes",
        title: "Spa Corporal y Masajes",
        category: "Masajes reductores, relajantes y linfáticos",
        price: "Consultar",
        image: "/images/servicios/masajes.png"
    },
    {
        id: "cejas",
        title: "Cejas y Pestañas",
        category: "Todos los servicios de cejas y pestañas",
        price: "Consultar",
        image: "/images/servicios/cejas.png"
    }
];

export const ServiceGrid = () => {
    return (
        <section className="py-24 px-6 md:px-12 bg-white text-dark">
            <div className="flex items-end justify-between mb-16 border-b border-dark/10 pb-8">
                <h2 className="text-6xl md:text-8xl font-medium tracking-tighter font-heading">
                    Servicios Selectos.
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
                {services.map((service, i) => (
                    <motion.a
                        key={i}
                        href={`/servicios#${service.id}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: i * 0.1 }}
                        className="group cursor-pointer cursor-scale perspective-1000 block"
                    >
                        <motion.div
                            whileHover={{
                                rotateY: 5,
                                rotateX: -5,
                                scale: 1.02,
                                boxShadow: "20px 20px 50px rgba(0,0,0,0.15)"
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            style={{ transformStyle: "preserve-3d" }}
                            className="h-full rounded-[2em]"
                        >
                            <GlowingEdgeCard mode="light" className="h-full bg-white rounded-[2em] overflow-hidden">
                                <div className="p-4 h-full flex flex-col">
                                    <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5em] mb-6 transform transition-transform group-hover:translate-z-10">
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg z-10">
                                            <ArrowUpRight size={24} color="black" />
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-start pt-2 px-2 pb-4">
                                        <div className="pr-4">
                                            <h3 className="text-4xl font-medium tracking-tight mb-2 font-heading group-hover:text-gold transition-colors">{service.title}</h3>
                                            <p className="text-xl text-neutral-500">{service.category}</p>
                                        </div>
                                        <span className="font-mono text-3xl text-gold font-bold whitespace-nowrap shrink-0">{service.price}</span>
                                    </div>
                                </div>
                            </GlowingEdgeCard>
                        </motion.div>
                    </motion.a>
                ))}
            </div>
        </section>
    );
};
