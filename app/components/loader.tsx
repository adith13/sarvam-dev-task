"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import CustomButton from "./customButton";

const NUM_LINES = 20;

const Loader = () => {
    const [startAnimation, setStartAnimation] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setStartAnimation(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const handleExit = () => setIsVisible(false);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="z-[1000] fixed inset-0 flex flex-row w-full h-screen bg-swhite"
                    initial={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -100 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                >
                    {Array.from({ length: NUM_LINES }).map((_, index) => (
                        <div key={index} className="-z-10 relative flex-1 h-full overflow-hidden">
                            <motion.div
                                initial={{ width: "1px" }}
                                animate={{
                                    width: startAnimation ? "100%" : "1px",
                                }}
                                transition={{
                                    duration: 2,
                                    ease: "easeInOut",
                                }}
                                className="top-0 left-0 absolute h-full bg-black"
                            />
                        </div>
                    ))}

                    <div className="absolute inset-0 flex flex-col justify-center items-center gap-0 pb-20">
                        <span className="font-family-berg text-[225px] text-swhite text-center uppercase tracking-[-25px] mix-blend-difference">SARVAM</span>

                        <motion.span
                            initial={{ scale: 0.8, opacity: 0, filter: "blur(8px)" }}
                            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                            transition={{ duration: 0.5, delay: 2 }}
                            className="block -mt-10 -mr-5 font-family-neue font-extralight text-swhite text-2xl text-center uppercase tracking-[27px] mix-blend-difference"
                        >
                            film foundation
                        </motion.span>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 2 }}
                            className="bottom-12 absolute"
                        >

                            <CustomButton
                                children="Enter"
                                onClick={handleExit}
                                height={42}
                                width1={96}
                                width2={42}
                                size={5}
                                mainclass="text-[12px] leading-[0] tracking-widest uppercase  font-family-neue"
                                beforeclass="bg-black text-swhite"
                                afterclass="bg-swhite text-black"
                                strokeColor="#FAF7EF"
                                strokeWidth={3}
                            />
                        </motion.div>

                    </div>

                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Loader;
