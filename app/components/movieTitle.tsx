'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface MovieTitleProps {
    title: string;
}

const AnimatedChar: React.FC<{ char: string; index: number; cycleKey: number }> = ({ char, index, cycleKey }) => {
    const charArray = [char, char, char, char, char, char, char, char]; // Repeat to create loop illusion

    return (
        <div
            className="relative flex items-end h-[70px] overflow-hidden"
        >
            <motion.div
                key={cycleKey} // trigger animation rerun every cycle
                className="flex flex-col justify-end items-end gap-0"
            >
                {charArray.map((c, i) => (
                    <motion.p
                        initial={{ y: '0%' }}
                        animate={{ y: ['0%', '700%', '100%', '0%'] }}
                        transition={{
                            duration: 2,
                            delay: index * 0.05,
                            ease: [
                                [0.9, 0, 1, 1],   // fast start for 0% → 700% → 100%
                                [0.9, 0.2, 0.1, 1] // slow deceleration for 100% → 0%
                            ],
                            times: [0, 0.4, 0.6, 1] // control keyframe timing
                        }}

                        key={i}
                        className="flex justify-center items-start w-fit h-[70px] pt-[2px] font-family-neue font-medium text-[89px] uppercase leading-[98%]"
                    >
                        {c}
                    </motion.p>
                ))}
            </motion.div>
        </div>
    );
};

const MovieTitle: React.FC<MovieTitleProps> = ({ title }) => {
    const [cycleKey, setCycleKey] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCycleKey((prev) => prev + 1);
        }, 10000); // 10 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <h1 className="flex flex-row gap-0 uppercase">
            {title.split('').map((char, index) => (
                <AnimatedChar key={`${char}-${index}-${cycleKey}`} char={char} index={index} cycleKey={cycleKey} />
            ))}
        </h1>
    );
};

export default MovieTitle;
