import React from 'react';
import { motion } from 'framer-motion';

const whatsappUrl = "https://wa.me/584122732426";

const fadeUp = {
    initial: { y: 24, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const highlights = [
    "Técnicas avanzadas y en constante formación",
    "Productos de la más alta calidad",
    "Atención personalizada en cada visita",
];

export const QuienesSomos = () => {
    return (
        <section id="quienes-somos" className="relative py-20 md:py-28 bg-[#1e1d1a] overflow-hidden">
            {/* Lunas decorativas, mismo lenguaje visual que el Hero */}
            <span className="absolute top-12 left-8 md:left-16 text-[#C9BFA4] text-xl opacity-25 rotate-[-15deg] select-none pointer-events-none">☽</span>
            <span className="absolute bottom-14 right-10 md:right-24 text-[#C9BFA4] text-2xl opacity-20 rotate-[20deg] select-none pointer-events-none">☽</span>
            <span className="absolute top-1/2 right-6 text-[#C9BFA4] text-base opacity-15 rotate-[40deg] select-none pointer-events-none hidden md:inline-block">☽</span>
            <span className="absolute bottom-1/3 left-6 text-[#C9BFA4] text-base opacity-15 rotate-[-40deg] select-none pointer-events-none hidden md:inline-block">☽</span>

            <div className="relative z-10 max-w-6xl mx-auto px-6">
                {/* Separador: marca la transición desde el Hero. Las líneas se
                    dibujan desde la lunita hacia afuera al entrar en pantalla. */}
                <style>{`
                    @keyframes dividerMoonGlow {
                        0%, 100% { text-shadow: 0 0 6px rgba(224, 215, 190, 0.5); opacity: 0.85; }
                        50% { text-shadow: 0 0 12px rgba(245, 239, 220, 0.95), 0 0 26px rgba(201, 191, 164, 0.55); opacity: 1; }
                    }
                    .divider-moon { animation: dividerMoonGlow 4s ease-in-out infinite; }
                    @media (prefers-reduced-motion: reduce) { .divider-moon { animation: none; } }
                `}</style>
                <div className="flex items-center gap-5 mb-16 md:mb-24">
                    <motion.span
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                        style={{ originX: 1 }}
                        className="flex-1 h-px bg-gradient-to-r from-transparent via-[#4a463d] to-[#4a463d]"
                    />
                    <motion.span
                        initial={{ opacity: 0, scale: 0.4 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        className="divider-moon text-[#C9BFA4] text-lg leading-none select-none"
                    >
                        ☽
                    </motion.span>
                    <motion.span
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                        style={{ originX: 0 }}
                        className="flex-1 h-px bg-gradient-to-l from-transparent via-[#4a463d] to-[#4a463d]"
                    />
                </div>

                {/* Indentación md/lg: alinea el inicio del contenido con el texto del Hero
                    (que queda desplazado por la columna de redes sociales). */}
                <style>{`
                    @keyframes karenFloat {
                        0%, 100% { transform: translateY(0) rotate(3deg); }
                        50% { transform: translateY(-9px) rotate(3deg); }
                    }
                    .karen-float { animation: karenFloat 5s ease-in-out infinite; }
                    @keyframes karenGlow {
                        0%, 100% { opacity: 0.25; }
                        50% { opacity: 0.5; }
                    }
                    .karen-glow { animation: karenGlow 6s ease-in-out infinite; }
                    @media (prefers-reduced-motion: reduce) {
                        .karen-float, .karen-glow { animation: none; }
                    }
                `}</style>
                <div className="flex flex-col md:flex-row items-center gap-16 md:gap-16 lg:gap-24 md:pl-[50px] lg:pl-[94px]">
                    {/* Imágenes */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full md:w-[42%] shrink-0 max-w-sm mx-auto md:mx-0 mb-8 md:mb-0 group"
                    >
                        {/* Halo dorado que respira detrás de las fotos */}
                        <div className="karen-glow absolute -inset-8 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(201,191,164,0.35),transparent_65%)] blur-2xl pointer-events-none" />
                        <div className="relative aspect-[3/4] w-full rounded-[2em] overflow-hidden border border-[#4a463d]">
                            <img
                                src="/images/karen/WhatsApp Image 2026-07-16 at 11.40.37 AM.jpeg"
                                alt="Karen, especialista de LuaNails"
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                            <div className="absolute inset-3 border border-[#C9BFA4]/20 rounded-[1.5em] pointer-events-none z-10" />
                        </div>
                        <div className="karen-float absolute -bottom-8 -right-4 md:-right-10 w-32 md:w-44 aspect-[3/4] rounded-[1.25em] overflow-hidden border-4 border-[#1e1d1a] shadow-2xl">
                            <img
                                src="/images/karen/WhatsApp Image 2026-07-16 at 11.40.36 AM.jpeg"
                                alt="Karen rodeada de esmaltes en LuaNails"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>

                    {/* Texto: los elementos entran escalonados, uno tras otro */}
                    <motion.div
                        variants={{
                            animate: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
                        }}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true, margin: "-100px" }}
                        className="w-full md:flex-1 text-center md:text-left"
                    >
                        <motion.p variants={fadeUp} className="text-[11px] tracking-[3px] text-[#C9BFA4] uppercase">Quiénes Somos</motion.p>
                        <motion.h2 variants={fadeUp} className="mt-4 font-heading text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-[#FAF7F0]">
                            Conoce a Karen
                        </motion.h2>
                        <motion.p variants={fadeUp} className="mt-6 text-[15px] leading-relaxed text-[#B4B2A9] max-w-md mx-auto md:mx-0">
                            Apasionada por el arte del cuidado personal y el diseño de uñas. En LuaNails, cada detalle
                            está pensado para ofrecerte una experiencia de relajación y belleza absoluta.
                        </motion.p>
                        <motion.p variants={fadeUp} className="mt-4 text-[15px] leading-relaxed text-[#B4B2A9] max-w-md mx-auto md:mx-0">
                            Mi misión es que te sientas única, cuidada y renovada desde el momento en que cruzas la puerta.
                        </motion.p>

                        <ul className="mt-8 space-y-3 max-w-md mx-auto md:mx-0 text-left">
                            {highlights.map((item) => (
                                <motion.li variants={fadeUp} key={item} className="flex items-start gap-3 text-[14px] leading-relaxed text-[#B4B2A9]">
                                    <span className="text-[#C9BFA4] text-xs mt-1 select-none">☽</span>
                                    {item}
                                </motion.li>
                            ))}
                        </ul>

                        <motion.div variants={fadeUp} className="mt-10 flex flex-col md:flex-row items-center gap-8 md:gap-10">
                            <div className="text-center md:text-left">
                                <span className="font-heading text-2xl text-[#C9BFA4]">Karen</span>
                                <p className="text-[10px] font-medium tracking-[2px] uppercase text-[#5F5E5A] mt-1">
                                    Fundadora &amp; Especialista
                                </p>
                            </div>
                            <span className="hidden md:block w-px h-10 bg-[#4a463d]" />
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block border border-[#C9BFA4] text-[#C9BFA4] px-8 py-3 rounded-full text-sm font-medium tracking-wide hover:bg-[#C9BFA4] hover:text-[#1e1d1a] transition-all duration-300 cursor-pointer cursor-scale"
                            >
                                AGENDAR CITA
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
