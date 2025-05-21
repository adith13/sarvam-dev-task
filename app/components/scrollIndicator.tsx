'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorScrollIndicator() {
    const [isPressed, setIsPressed] = useState(false);
    const [isHoveringButton, setIsHoveringButton] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
    const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX - 40);
            mouseY.set(e.clientY - 40);
        };

        const checkHover = (e: MouseEvent) => {
            const el = e.target as HTMLElement;
            if (el.closest('button')) {
                setIsHoveringButton(true);
            } else {
                setIsHoveringButton(false);
            }
        };

        const handleDown = () => setIsPressed(true);
        const handleUp = () => setIsPressed(false);

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousemove', checkHover);
        window.addEventListener('mousedown', handleDown);
        window.addEventListener('mouseup', handleUp);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousemove', checkHover);
            window.removeEventListener('mousedown', handleDown);
            window.removeEventListener('mouseup', handleUp);
        };
    }, [mouseX, mouseY]);

    if (isHoveringButton) return null;

    return (
        <motion.div
            className="z-50 fixed flex justify-center items-center border border-white/30 rounded-full pointer-events-none"
            style={{ left: springX, top: springY }}
            animate={{
                width: isPressed ? 82 : 96,
                height: isPressed ? 82 : 96,
            }}
        >
            {!isPressed ? (
                <span className="font-family-sans text-swhite text-xs select-none">SCROLL</span>
            ) : (
                <div className="flex flex-col justify-center items-center gap-28 text-swhite">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 23" width="18" height="11" fill="currentColor">
                        <path d="M20.108.974C32.215 5.824 34.855 16.886 34.59 22.15h-4.924c0-9.384-8.278-14.7-12.417-16.462C6.759 10.924 5.099 18.66 5.58 22.15H.015C-.423 10.453 8.293 3.74 14.419 1.034c1.806-.798 3.857-.794 5.69-.06Z" />
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 35 23"
                        width="18"
                        height="11"
                        fill="currentColor"
                        style={{ transform: 'rotate(180deg)' }}
                    >
                        <path d="M20.108.974C32.215 5.824 34.855 16.886 34.59 22.15h-4.924c0-9.384-8.278-14.7-12.417-16.462C6.759 10.924 5.099 18.66 5.58 22.15H.015C-.423 10.453 8.293 3.74 14.419 1.034c1.806-.798 3.857-.794 5.69-.06Z" />
                    </svg>
                </div>
            )}
        </motion.div>
    );
}
