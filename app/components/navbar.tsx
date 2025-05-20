'use client';

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Facebook, Linkedin, X, Download, MoveDown, ChevronDown } from "lucide-react";
import { CustomDiv } from "./customDiv";

interface NavbarProps {
    children?: React.ReactNode;
    className?: string;
    height?: number;
    width?: number;
    size?: number;
    strokeColor?: string;
    strokeWidth?: number;
}

// Main Navbar component
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const containerVariants = {
        animate: {
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        initial: { y: "200%" },
        animate: { y: 0, transition: { duration: 0.6, ease: "easeOut" } },
        exit: { y: "200%", transition: { duration: 0.3, ease: "easeIn" } },
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="top-8 right-8 z-50 fixed flex flex-col justify-center items-center mx-auto max-w-lg">
            {/* Default state (collapsed) */}
            <div className="z-10 flex flex-row items-center-justify-center gap-0">

                <CustomDiv
                    width={238}
                    height={103}
                    size={9}
                    strokeColor="white"
                    strokeWidth={0}
                    className="overflow-hidden bg-swhite font-family-neue"
                >
                    <div className="flex flex-col px-3.5 py-4 w-full h-full">
                        <motion.div
                            className="flex flex-row justify-between items-start"
                            initial="closed"
                            animate={isOpen ? "open" : "closed"}
                            variants={{
                                open: {},
                                closed: {},
                            }}
                        >
                            <div className="flex flex-row justify-start items-start gap-2.5">
                                {/* Avatar - Slide left */}
                                <motion.img
                                    src="https://cdn.cosmos.so/c4d29f1c-398d-4aad-a231-9107a3bdb396?format=jpeg"
                                    alt="ANA MAXIM"
                                    className="rounded-md w-[38px] h-[38px] object-cover"
                                    variants={{
                                        open: { x: -50, opacity: 0 },
                                        closed: { x: 0, opacity: 1 },
                                    }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                />

                                {/* Name - Slide up */}
                                <motion.p
                                    className="-mt-1 font-family-neue text-xl leading-snug"
                                    variants={{
                                        open: { y: -30, opacity: 0 },
                                        closed: { y: 0, opacity: 1 },
                                    }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                >
                                    ANA MAXIM
                                </motion.p>
                            </div>

                            {/* Chevron - Rotate and fade out */}
                            <motion.div
                                variants={{
                                    open: { rotate: 180, opacity: 0 },
                                    closed: { rotate: 0, opacity: 1 },
                                }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                            >
                                <ChevronDown className="-mt-1.5 w-6 h-6 text-black/80" />
                            </motion.div>
                        </motion.div>


                        <motion.div className="bottom-[28px] left-0 absolute border-t border-black w-full"
                            initial={{ x: 0 }}
                            animate={isOpen ? { x: "-100%" } : { x: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="bottom-0 left-0 absolute flex w-full font-family-neue font-light text-[#7d7b77] text-[8px] text-center tracking-[1.5px]"
                            initial={{ y: 0 }}
                            animate={isOpen ? { y: "200%" } : { y: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                            <div className="flex-1 py-[8px]">SHORT FILM</div>
                            <div className="px-4 py-[8px] border-r border-black border-l">2024</div>
                            <div className="flex-1 py-[8px]">MIN 27</div>
                        </motion.div>

                    </div>
                </CustomDiv>

                <CustomDiv
                    width={103}
                    height={103}
                    size={9}
                    strokeColor="white"
                    strokeWidth={0}
                    className="group relative flex justify-center items-center border-2 custom-border-right overflow-hidden bg-swhite font-family-neue hover:curs"
                >
                    <motion.button
                        onClick={toggleMenu}
                        className="relative flex justify-center items-center w-full h-full overflow-hidden"
                    >
                        <motion.div
                            className="absolute inset-0 bg-swhite"
                            initial={{ y: '-100%' }}
                            whileHover={{ y: '0%' }}
                            transition={{ duration: 0.7, ease: 'easeOut' }}
                        />

                        {/* this should turn into a cross */}
                        <div className="relative flex flex-col justify-center items-center gap-[2px] w-full h-full">
                            <motion.div
                                className="border-t-3 border-black w-10"
                                initial={false}
                                animate={isOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: -2 }}
                                transition={{ duration: 0.3 }}
                            />
                            <motion.div 
                                className="border-t-3 border-black w-10"
                                initial={false}
                                animate={isOpen ? { opacity: 0 } : { opacity: 1, y:-1 }}
                                transition={{ duration: 0.3 }}
                            />
                            <motion.div
                                className="border-t-3 border-black w-10"
                                initial={false}
                                animate={isOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>

                    </motion.button>

                </CustomDiv>
            </div>

            {/* Expanded state */}<AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 346 }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        style={{ transformOrigin: "top" }}
                        className="-z-0 relative flex flex-col pt-[9px] overflow-hidden font-family-neue"
                    >
                        <div className="top-0 left-0 z-10 absolute flex flex-row justify-center items-start gap-0 h-5 overflow-hidden">
                            <CustomDiv
                                width={238}
                                height={40}
                                size={9}
                                strokeColor="white"
                                strokeWidth={0}
                                className="custom-border-top overflow-hidden bg-swhite font-family-neue"
                            />

                            <CustomDiv
                                width={103}
                                height={40}
                                size={9}
                                strokeColor="white"
                                strokeWidth={0}
                                className="group relative flex justify-center items-center custom-border-top overflow-hidden bg-swhite font-family-neue hover:curs"
                            />
                        </div>
                        <CustomDiv
                            width={341}
                            height={326}
                            size={9}
                            className="overflow-hidden bg-swhite"
                            strokeWidth={0}
                        >
                            <motion.div
                                variants={containerVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="flex flex-col w-full h-full"
                            >
                                {/* TOP: Navigation links */}
                                <div className="flex-1 px-6 pt-2.5">
                                    <div className="flex flex-col gap-0 uppercase leading-tight">
                                        {["WORK", "ABOUT", "CONTACT"].map((label, i) => (
                                            <div key={label} className="overflow-hidden">
                                                <motion.div
                                                    variants={itemVariants}
                                                    className="flex items-baseline gap-2"
                                                >
                                                    <span className="text-[#7d7b77] text-sm">0{i + 1}</span>
                                                    <span className="text-[32px]">{label}</span>
                                                </motion.div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div
                                    className="flex px-6 py-6 border-[#afaca7] border-t border-dashed"
                                >
                                    <div className="flex flex-row gap-10 text-[#7d7b77] hover:text-black text-xs leading-tight tracking-[1.5px]">
                                        {["COOKIE", "TERMS", "PRIVACY"].map((text, i) => (
                                            <div key={i} className="h-fit overflow-hidden">
                                                <motion.p
                                                    variants={itemVariants}
                                                    className="hover:cursor-pointer"
                                                >
                                                    {text}
                                                </motion.p>
                                            </div>
                                        ))}
                                    </div>
                                </div>


                                {/* SOCIALS */}
                                <div className="px-6 py-5 border-[#afaca7] border-t border-dashed">
                                    <div className="flex gap-6">
                                        <Instagram size={20} />
                                        <Facebook size={20} />
                                        <Linkedin size={20} />
                                    </div>
                                </div>

                                {/* COPYRIGHT */}
                                <div className="px-6 py-4 border-[#afaca7] border-t border-dashed">
                                    <div className="flex justify-between items-center">
                                        <div className="text-[#7d7b77] text-xs tracking-[1.5px]">
                                            ©2024. SIENA FILM FOUNDATION.
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </CustomDiv>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}