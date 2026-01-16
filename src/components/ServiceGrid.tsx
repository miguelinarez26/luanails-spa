import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { GlowingEdgeCard } from './GlowingEdgeCard';

const services = [
    {
        title: "Manicura Gel Premium",
        category: "Cuidado y Color",
        price: "$45",
        image: "/assets/portfolio-1.png"
    },
    {
        title: "Uñas Smart NFC",
        category: "Tecnología",
        price: "$80",
        image: "/assets/portfolio-3.png"
    },
    {
        title: "Esculpido Soft Gel",
        category: "Extensiones",
        price: "$65",
        image: "/assets/portfolio-2.png"
    },
    {
        title: "Ritual Spa Japonés",
        category: "Bienestar",
        price: "$30",
        image: "/assets/hero.png"
    }
];

export const ServiceGrid = () => {
    return (
        <section className="py-24 px-6 md:px-12 bg-white text-dark">
            <div className="flex items-end justify-between mb-16 border-b border-dark/10 pb-8">
                <h2 className="text-6xl md:text-8xl font-medium tracking-tighter font-heading">
                    Servicios <br /> Selectos.
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
                {services.map((service, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: i * 0.1 }}
                        className="group cursor-pointer cursor-scale perspective-1000"
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

                                    <div className="flex justify-between items-start pt-2 px-2 pb-4 mt-auto">
                                        <div>
                                            <h3 className="text-4xl font-medium tracking-tight mb-2 font-heading group-hover:text-gold transition-colors">{service.title}</h3>
                                            <p className="text-xl text-neutral-500">{service.category}</p>
                                        </div>
                                        <span className="font-mono text-3xl text-gold font-bold">{service.price}</span>
                                    </div>
                                </div>
                            </GlowingEdgeCard>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
