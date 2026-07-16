import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
};

const containerAnim = {
    animate: {
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        }
    }
};

// Mismos enlaces de redes que el Footer
const instagramUrl = "https://www.instagram.com/luanails_kb?igsh=MXQzeWZvNmJqNTM3ag==";
const whatsappUrl = "https://wa.me/584122732426";

// Media lunas doradas esparcidas en el fondo, tipo cielo estrellado.
// mobileVisible: false => solo aparecen desde md (menos cantidad en mobile).
// lit: true => siempre encendidas (brillo constante); false => apagadas, brillan al hacer hover.
// Generadas con un PRNG con semilla fija para que el layout sea el mismo en servidor y cliente.
function mulberry32(seed: number) {
    return function () {
        seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

// Distribución en cuadrícula con "jitter": cada luna ocupa su propia celda y se
// desplaza un poco dentro de ella. Así quedan repartidas de forma pareja (sin
// amontonamientos ni huecos) pero conservando un aspecto orgánico.
const GRID_COLS = 9;
const GRID_ROWS = 6;
const LIT_RATIO = 0.65; // mayoría encendidas para efecto "cielo estrellado"

// Zona de exclusión: elipse que cubre el círculo del logo (con margen para el
// anillo decorativo), para que ninguna luna choque con él en desktop.
const LOGO_CENTER_X = 73;
const LOGO_CENTER_Y = 56;
const LOGO_RADIUS_X = 23;
const LOGO_RADIUS_Y = 39;

const rand = mulberry32(7);
const crescents: { top: string; left: string; size: number; rotate: number; mobileVisible: boolean; lit: boolean }[] = [];
for (let row = 0; row < GRID_ROWS; row++) {
    for (let col = 0; col < GRID_COLS; col++) {
        const left = ((col + 0.2 + rand() * 0.6) / GRID_COLS) * 100;
        const top = ((row + 0.2 + rand() * 0.6) / GRID_ROWS) * 100;
        const inLogoZone =
            ((left - LOGO_CENTER_X) / LOGO_RADIUS_X) ** 2 +
            ((top - LOGO_CENTER_Y) / LOGO_RADIUS_Y) ** 2 < 1;
        if (inLogoZone) {
            // Consumimos los mismos aleatorios para no alterar el resto del layout.
            rand(); rand(); rand();
            continue;
        }
        crescents.push({
            top: `${top.toFixed(1)}%`,
            left: `${left.toFixed(1)}%`,
            size: Math.round(rand() * 9 + 7),
            rotate: Math.round(rand() * 140 - 70),
            // En mobile mostramos una de cada dos columnas para no saturar.
            mobileVisible: col % 2 === 0,
            lit: rand() < LIT_RATIO,
        });
    }
}

// Lunas extra colocadas a mano en la franja derecha y alrededor del logo,
// para equilibrar la densidad con el lado izquierdo sin invadir la zona del logo.
const extraSpots = [
    { top: 4, left: 60 }, { top: 5, left: 72 }, { top: 8, left: 84 },
    { top: 14, left: 94 }, { top: 30, left: 96 }, { top: 46, left: 97 },
    { top: 64, left: 97.5 }, { top: 78, left: 96 },
    { top: 92, left: 60 }, { top: 96, left: 75 }, { top: 93, left: 88 },
];
for (const spot of extraSpots) {
    crescents.push({
        top: `${spot.top}%`,
        left: `${spot.left}%`,
        size: Math.round(rand() * 9 + 7),
        rotate: Math.round(rand() * 140 - 70),
        mobileVisible: false,
        lit: rand() < LIT_RATIO,
    });
}

const socialLinks = [
    {
        name: 'Instagram',
        href: instagramUrl,
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
        )
    },
    {
        name: 'WhatsApp',
        href: whatsappUrl,
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
            </svg>
        )
    }
];

export const Hero = () => {
    const heroRef = useRef<HTMLElement>(null);
    const crescentRefs = useRef<(HTMLSpanElement | null)[]>([]);

    const handleScrollDown = () => {
        heroRef.current?.nextElementSibling?.scrollIntoView({ behavior: 'smooth' });
    };

    // Las lunitas están detrás de la capa de contenido (z-0 vs z-10), así que el
    // :hover nativo nunca les llega; encendemos las apagadas por cercanía del mouse.
    const handleMouseMove = (e: React.MouseEvent) => {
        crescentRefs.current.forEach((el) => {
            if (!el || !el.classList.contains('crescent-off')) return;
            const rect = el.getBoundingClientRect();
            const dx = e.clientX - (rect.left + rect.width / 2);
            const dy = e.clientY - (rect.top + rect.height / 2);
            el.classList.toggle('crescent-near', Math.hypot(dx, dy) < 55);
        });
    };

    return (
        <section ref={heroRef} onMouseMove={handleMouseMove} className="relative min-h-screen w-full flex flex-col bg-[#1e1d1a] overflow-hidden">
            {/* Media lunas doradas sutiles (menos cantidad y tamaño en mobile) */}
            <style>{`
                .crescent {
                    transition: opacity 0.6s ease, text-shadow 0.6s ease, color 0.6s ease;
                }
                .crescent-lit {
                    opacity: 0.95;
                    color: #F5EFDC;
                    text-shadow: 0 0 10px rgba(245, 239, 220, 1), 0 0 24px rgba(224, 215, 190, 0.9), 0 0 44px rgba(201, 191, 164, 0.6), 0 0 68px rgba(201, 191, 164, 0.3);
                    animation: crescentTwinkle var(--tw-dur, 4s) ease-in-out var(--tw-delay, 0s) infinite;
                }
                @keyframes crescentTwinkle {
                    0%, 100% { opacity: 0.95; }
                    50% { opacity: 0.45; }
                }
                .shooting-star {
                    position: absolute;
                    width: 110px;
                    height: 1.5px;
                    border-radius: 999px;
                    background: linear-gradient(90deg, rgba(245, 239, 220, 0), rgba(245, 239, 220, 0.9));
                    opacity: 0;
                    pointer-events: none;
                }
                .shooting-star-1 {
                    top: 18%;
                    left: 70%;
                    animation: shootingStar1 11s linear 3s infinite;
                }
                .shooting-star-2 {
                    top: 55%;
                    left: 40%;
                    animation: shootingStar2 13s linear 8s infinite;
                }
                @keyframes shootingStar1 {
                    0%, 88% { opacity: 0; transform: translate(0, 0) rotate(160deg); }
                    90% { opacity: 0.9; }
                    96%, 100% { opacity: 0; transform: translate(-38vw, 22vh) rotate(160deg); }
                }
                @keyframes shootingStar2 {
                    0%, 90% { opacity: 0; transform: translate(0, 0) rotate(160deg); }
                    92% { opacity: 0.75; }
                    97%, 100% { opacity: 0; transform: translate(-30vw, 17vh) rotate(160deg); }
                }
                @media (prefers-reduced-motion: reduce) {
                    .crescent-lit, .shooting-star { animation: none; }
                }
                .crescent-off {
                    opacity: 0.22;
                }
                .crescent-off.crescent-near {
                    opacity: 1;
                    color: #FBF7EA;
                    text-shadow: 0 0 10px rgba(251, 247, 234, 1), 0 0 26px rgba(224, 215, 190, 0.95), 0 0 48px rgba(201, 191, 164, 0.7), 0 0 74px rgba(201, 191, 164, 0.4);
                }
            `}</style>
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                {crescents.map((crescent, i) => (
                    <span
                        key={i}
                        ref={(el) => { crescentRefs.current[i] = el; }}
                        className={`absolute text-[#C9BFA4] leading-none crescent ${crescent.lit ? 'crescent-lit' : 'crescent-off'} ${crescent.mobileVisible ? '' : 'hidden md:inline-block'}`}
                        style={{
                            top: crescent.top,
                            left: crescent.left,
                            fontSize: `clamp(${Math.round(crescent.size * 0.55)}px, 2.2vw, ${crescent.size}px)`,
                            transform: `rotate(${crescent.rotate}deg)`,
                            '--tw-dur': `${(3 + (i % 5) * 0.8).toFixed(1)}s`,
                            '--tw-delay': `${((i * 0.53) % 4).toFixed(2)}s`,
                        } as React.CSSProperties}
                    >
                        ☽
                    </span>
                ))}
                {/* Estrellas fugaces ocasionales */}
                <span className="shooting-star shooting-star-1" />
                <span className="shooting-star shooting-star-2" />
            </div>

            {/* Layout: una columna en mobile, dos columnas desde md */}
            <motion.div
                variants={containerAnim}
                initial="initial"
                animate="animate"
                className="relative z-10 flex-1 w-full max-w-6xl mx-auto px-6 pt-28 pb-10 flex flex-col-reverse md:flex-row items-center justify-center gap-10 md:gap-12 lg:gap-20"
            >
                {/* Columna izquierda */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-8 lg:gap-10 w-full md:w-auto">
                    {/* Redes sociales: horizontales debajo del CTA en mobile, verticales a la izquierda desde md */}
                    <motion.div
                        variants={fadeUp}
                        className="order-2 md:order-1 flex flex-row md:flex-col items-center gap-5 md:pt-2"
                    >
                        <span className="hidden md:block w-px h-16 bg-[#4a463d] order-2" />
                        {socialLinks.map((social) => (
                            <a
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.name}
                                className="text-[#837853] hover:text-[#C9BFA4] transition-colors duration-200 cursor-scale order-1"
                            >
                                {social.icon}
                            </a>
                        ))}
                    </motion.div>

                    {/* Texto */}
                    <div className="order-1 md:order-2 text-center md:text-left max-w-md">
                        <motion.p
                            variants={fadeUp}
                            className="text-[11px] tracking-[3px] text-[#C9BFA4] uppercase"
                        >
                            Lua Nails Studio
                        </motion.p>
                        <motion.h1
                            variants={fadeUp}
                            className="mt-4 font-heading text-[40px] leading-[1.15] text-[#FAF7F0]"
                        >
                            Cada luna, un nuevo diseño
                        </motion.h1>
                        <motion.p
                            variants={fadeUp}
                            className="mt-5 text-[14px] leading-relaxed text-[#B4B2A9]"
                        >
                            Uñas que cuentan tu historia, cuidadas hasta el último detalle.
                        </motion.p>
                        <motion.div variants={fadeUp} className="mt-8">
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-[#C9BFA4] text-[#1e1d1a] px-8 py-3 rounded-full text-sm font-medium tracking-wide hover:bg-[#FAF7F0] transition-colors duration-300 cursor-scale"
                            >
                                AGENDAR CITA
                            </a>
                        </motion.div>
                    </div>
                </div>

                {/* Columna derecha: la luna */}
                <motion.div variants={fadeUp} className="relative flex items-center justify-center shrink-0">
                    {/* Anillo decorativo exterior */}
                    <div className="absolute -inset-2 md:-inset-3 lg:-inset-4 rounded-full border border-[#4a463d] pointer-events-none" />
                    {/* Contenedor circular blanco (luna llena) */}
                    <div className="w-52 h-52 md:w-72 md:h-72 lg:w-[450px] lg:h-[450px] rounded-full bg-[#ffffff] overflow-hidden flex items-center justify-center select-none pointer-events-none">
                        <video
                            src="/images/LuaNails-logo-animado-v2_1.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                        />
                    </div>
                </motion.div>
            </motion.div>

            {/* Indicador de scroll */}
            <div className="relative z-10 pb-6 text-center">
                <button
                    onClick={handleScrollDown}
                    className="text-[10px] tracking-[3px] text-[#5F5E5A] hover:text-[#C9BFA4] transition-colors duration-200 cursor-pointer cursor-scale"
                >
                    DESLIZA ↓
                </button>
            </div>
        </section>
    );
};
