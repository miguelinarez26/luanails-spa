import React from 'react';
import { motion } from 'framer-motion';

const letterAnim = {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
};

const containerAnim = {
    animate: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        }
    }
};

export const Hero = () => {

    return (
        <section className="relative h-screen w-full flex flex-col items-center justify-center bg-dark text-dark overflow-hidden">
            {/* Background Video/Image - Clear and Sharp */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <img
                    src="https://bkylyjjnrthoxbeculgk.supabase.co/storage/v1/object/public/media/6d91af75-b690-4052-bd68-75f53c27d68d-ezgif.com-video-to-webp-converter.webp"
                    alt="Background Ambience"
                    className="w-full h-full object-cover"
                />
                {/* No overlay for maximum clarity as requested */}
            </div>

            {/* Content removed as requested (Logo and Slogan gone) */}
            <div className="w-full px-4 text-center relative z-10 hidden">
            </div>
        </section>
    );
};
