import React, { useEffect, useRef, useState } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface GlowingEdgeCardProps extends React.HTMLAttributes<HTMLDivElement> {
    mode?: 'dark' | 'light';
    children?: React.ReactNode;
}

export function GlowingEdgeCard({
    mode = 'light',
    className,
    children,
    ...props
}: GlowingEdgeCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    // Helper functions for math
    const round = (value: number, precision = 3) => parseFloat(value.toFixed(precision));
    const clamp = (value: number, min = 0, max = 100) => Math.min(Math.max(value, min), max);

    const centerOfElement = (rect: DOMRect) => {
        return [rect.width / 2, rect.height / 2];
    };

    const getPointerPosition = (rect: DOMRect, e: MouseEvent | React.MouseEvent) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const px = clamp((100 / rect.width) * x);
        const py = clamp((100 / rect.height) * y);
        return { pixels: [x, y], percent: [px, py] };
    };

    const angleFromPointer = (dx: number, dy: number) => {
        let angleRadians = 0;
        let angleDegrees = 0;
        if (dx !== 0 || dy !== 0) {
            angleRadians = Math.atan2(dy, dx);
            angleDegrees = angleRadians * (180 / Math.PI) + 90;
            if (angleDegrees < 0) {
                angleDegrees += 360;
            }
        }
        return angleDegrees;
    };

    const closenessToEdge = (rect: DOMRect, x: number, y: number) => {
        const [cx, cy] = centerOfElement(rect);
        const dx = x - cx;
        const dy = y - cy;
        let k_x = Infinity;
        let k_y = Infinity;
        if (dx !== 0) {
            k_x = cx / Math.abs(dx);
        }
        if (dy !== 0) {
            k_y = cy / Math.abs(dy);
        }
        return clamp((1 / Math.min(k_x, k_y)), 0, 1);
    };

    const handlePointerMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const position = getPointerPosition(rect, e);
        const [px, py] = position.pixels;
        const [perx, pery] = position.percent;

        const [cx, cy] = centerOfElement(rect);
        const dx = px - cx;
        const dy = py - cy;

        const edge = closenessToEdge(rect, px, py);
        const angle = angleFromPointer(dx, dy);

        cardRef.current.style.setProperty('--pointer-x', `${round(perx)}%`);
        cardRef.current.style.setProperty('--pointer-y', `${round(pery)}%`);
        cardRef.current.style.setProperty('--pointer-deg', `${round(angle)}deg`);
        cardRef.current.style.setProperty('--pointer-d', `${round(edge * 100)}`);

        if (isAnimating) {
            setIsAnimating(false);
            cardRef.current.classList.remove('animating');
        }
    };

    useEffect(() => {
        const playAnimation = () => {
            if (!cardRef.current) return;

            setIsAnimating(true);
            const angleStart = 110;
            const angleEnd = 465;

            cardRef.current.style.setProperty('--pointer-deg', `${angleStart}deg`);

            const startTime = performance.now();

            const animate = (now: number) => {
                if (!cardRef.current || !cardRef.current.classList.contains('animating')) return;

                const elapsed = now - startTime;

                if (elapsed > 500 && elapsed < 1000) {
                    const t = (elapsed - 500) / 500;
                    const ease = 1 - Math.pow(1 - t, 3);
                    cardRef.current.style.setProperty('--pointer-d', `${ease * 100}`);
                }

                if (elapsed > 500 && elapsed < 2000) {
                    const t = (elapsed - 500) / 1500;
                    const ease = t * t * t;
                    const d = (angleEnd - angleStart) * (ease * 0.5) + angleStart;
                    cardRef.current.style.setProperty('--pointer-deg', `${d}deg`);
                }

                if (elapsed >= 2000 && elapsed < 4250) {
                    const t = (elapsed - 2000) / 2250;
                    const ease = 1 - Math.pow(1 - t, 3);
                    const d = (angleEnd - angleStart) * (0.5 + ease * 0.5) + angleStart;
                    cardRef.current.style.setProperty('--pointer-deg', `${d}deg`);
                }

                if (elapsed > 3000 && elapsed < 4500) {
                    const t = (elapsed - 3000) / 1500;
                    const ease = t * t * t;
                    cardRef.current.style.setProperty('--pointer-d', `${(1 - ease) * 100}`);
                }

                if (elapsed < 4500) {
                    requestAnimationFrame(animate);
                } else {
                    setIsAnimating(false);
                    cardRef.current?.classList.remove('animating');
                }
            };

            requestAnimationFrame(animate);
        };

        const timer = setTimeout(() => {
            playAnimation();
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className={cn(
                "relative w-full h-full",
                "flex flex-col rounded-[2em]",
                "group transition-colors duration-300",
                mode === 'light' ? 'light-mode' : 'dark-mode',
                isAnimating && 'animating',
                className
            )}
            ref={cardRef}
            onPointerMove={handlePointerMove}
            style={{
                '--glow-sens': '30',
                '--pointer-x': '50%',
                '--pointer-y': '50%',
                '--pointer-deg': '45deg',
                '--pointer-d': '0',
                '--color-sens': 'calc(var(--glow-sens) + 20)',
                '--card-bg': mode === 'light'
                    ? 'linear-gradient(8deg, #ffffff 75%, #f9f9f9 75.5%)'
                    : 'linear-gradient(8deg, #1a1a1a 75%, color-mix(in hsl, #1a1a1a, white 2.5%) 75.5%)',
                '--blend': 'normal',
                '--glow-blend': 'normal',
                // User requested "black light" to stand out. 
                // On white bg, black glow is shadow-like.
                '--glow-color': mode === 'light' ? '0deg 0% 0%' : '50deg 100% 50%',
                '--glow-boost': '10%',
            } as React.CSSProperties}
            {...props}
        >
            <style dangerouslySetInnerHTML={{
                __html: `
            .glowing-card-mesh-border {
                position: absolute;
                inset: 0;
                border-radius: inherit;
                z-index: -1;
                border: 1px solid transparent;
                background:
                    linear-gradient(var(--card-bg) 0 100%) padding-box,
                    linear-gradient(rgb(255 255 255 / 0%) 0% 100%) border-box,
                     /* Simplify defaults for pure effect */
                    linear-gradient(var(--card-bg) 0 100%) border-box; 
                opacity: calc((var(--pointer-d) - var(--color-sens)) / (100 - var(--color-sens)));
                mask-image: conic-gradient(from var(--pointer-deg) at center, black 25%, transparent 40%, transparent 60%, black 75%);
                transition: opacity 0.25s ease-out;
            }
            
            .glowing-card-glow {
                position: absolute;
                inset: -2px; 
                pointer-events: none;
                z-index: 1;
                mask-image: conic-gradient(from var(--pointer-deg) at center, black 2.5%, transparent 10%, transparent 90%, black 97.5%);
                opacity: calc((var(--pointer-d) - var(--glow-sens)) / (100 - var(--glow-sens)));
                mix-blend-mode: var(--glow-blend);
                transition: opacity 0.25s ease-out;
                border-radius: inherit;
            }
            
            .glowing-card-glow::before {
                content: "";
                position: absolute;
                inset: 2px;
                border-radius: inherit;
                box-shadow: 
                    0 0 1px 0 hsl(var(--glow-color) / 100%),
                    0 0 3px 0 hsl(var(--glow-color) / 80%),
                    0 0 10px 0 hsl(var(--glow-color) / 50%);
            }
        `}} />

            <div className="glowing-card-mesh-border" />
            <div className="glowing-card-glow" />

            <div className="relative z-10 w-full h-full overflow-hidden bg-[var(--card-bg)] bg-no-repeat rounded-[inherit] border border-black/5 shadow-sm">
                {children}
            </div>
        </div>
    );
}
