'use client';

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { CustomDiv } from "./customDiv";

// interface NavbarProps {
//     children?: React.ReactNode;
//     className?: string;
//     height?: number;
//     width?: number;
//     size?: number;
//     strokeColor?: string;
//     strokeWidth?: number;
// }
const ArrowButton = () => (
    <button className="flex justify-center items-center p-1.5 border-2 border-black border-dotted rounded-md hover:bg-black bg-none text-black hover:text-swhite transition duration-300 ease-in-out">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 11 10"
            className="w-2.5 h-2.5"
            fill="currentColor"
        >
            <path d="M4.481.005a6.65 6.65 0 0 1 6.46 4.659c.078.229.08.479-.003.706C10.302 7.105 8.318 10 4.48 10V8.39c.941.127 2.922-.257 4.442-2.603H0V4.208h8.938c-.756-1.229-2.216-2.78-4.457-2.78V.006Z" />
        </svg>
    </button>
);

const movies = [
    {
        id: 1,
        image: "https://film-grab.com/wp-content/uploads/2020/04/08-752.jpg",
        title: "TABOO",
        director: "SHAULY MELAMED",
    },
    {
        id: 2,
        image: "https://cdn.cosmos.so/fc5ac665-12e9-43cd-a15e-42e452da6042?format=jpeg",
        title: "ANA MAXIM",
        director: "GUY RITCHIE",
    },
    {
        id: 3,
        image: "https://cdn.cosmos.so/86ef199a-71ba-4f6d-b0c8-ea3a4870f269?format=jpeg",
        title: "OUTSIDER FREUD",
        director: "Chris Nolan",
    },
    {
        id: 4,
        image: "https://cdn.cosmos.so/e42117c6-7f07-4812-b7e8-7b0c58694aef?format=jpeg",
        title: "SAVOY",
        director: "Tony Stark",
    },
    {
        id: 5,
        image: "https://cdn.cosmos.so/8497ef2b-aa76-41af-9081-46a9bf4d541a?format=jpeg",
        title: "SARVAM",
        director: "Adith Narein",
    },
];

// Main Navbar component
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isListOpen, setIsListOpen] = useState(false);

    const containerVariants = {
        animate: {
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1,
            },
        },
    };

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const navItems = ["WORK", "ABOUT", "CONTACT"];

    const navItemVariants = {
        initial: { y: "100%" },
        animate: { y: "0%" },
    };

    const itemVariants = {
        initial: { y: "200%" },
        animate: { y: 0, transition: { duration: 0.6, ease: "easeOut" } },
        exit: { y: "200%", transition: { duration: 0.3, ease: "easeIn" } },
    };

    const toggleMenu = () => {
        const playCloseSound = () => {
            const audio = new Audio('/sounds/menu_IN.mp3');
            audio.playbackRate = 1; // 1.0 is normal speed, >1 is faster, <1 is slower
            audio.volume = 0.25; // Set volume to 50%
            audio.play();
        };

        if (isListOpen) {
            setIsListOpen(false);
            setTimeout(() => {
                setIsOpen(prev => {
                    playCloseSound(); // play when changing from true → false
                    return !prev;
                });
            }, 500); // wait for animation or closing list
        } else {
            setIsOpen(prev => {
                playCloseSound(); // play when changing from true → false
                return !prev;
            });
        }
    };

    const toggleList = () => {
        const audio = new Audio('/sounds/menu_IN.mp3');
        audio.playbackRate = 1; // 1.0 is normal speed, >1 is faster, <1 is slower
        audio.volume = 0.25; // Set volume to 50%
        audio.play();
        setIsListOpen(prev => !prev);
    };


    return (
        <div className="top-8 right-8 z-100 fixed flex flex-col justify-center items-start mx-auto max-w-lg">
            {/* Default state (collapsed) */}
            <div className="z-10 flex flex-row justify-center items-center gap-0">

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
                                    toggle: { rotate: 180, opacity: 1, y: "-50%" },
                                }}
                                animate={isListOpen ? "toggle" : isOpen ? "open" : "closed"}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                            >
                                <button
                                    onClick={toggleList} >
                                    <ChevronDown className="-mt-1.5 w-6 h-6 text-black/80" />
                                </button>
                            </motion.div>
                        </motion.div>


                        <motion.div className="bottom-[24px] left-0 absolute border-t border-black w-full"
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
                            <div className="flex-1 py-[6px]">SHORT FILM</div>
                            <div className="px-4 py-[6px] border-r border-black border-l">2024</div>
                            <div className="flex-1 py-[6px]">MIN 27</div>
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
                        whileHover="hover"
                        initial="initial"
                        className="relative flex justify-center items-center w-full h-full overflow-hidden"
                    >
                        <motion.div
                            variants={{
                                initial: { y: "100%" },
                                hover: { y: "0%" },
                            }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="top-0 left-0 z-0 absolute w-full h-full bg-[#d6d3cc]"
                        />

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
                                animate={isOpen ? { opacity: 0 } : { opacity: 1, y: -1 }}
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

            <AnimatePresence>
                {
                    isListOpen && (
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 220 }}
                            exit={{ height: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            style={{ transformOrigin: "top" }}
                            className="-z-0 relative flex flex-col overflow-hidden font-family-neue"
                        >
                            <CustomDiv
                                width={238}
                                height={220}
                                size={9}
                                strokeColor="white"
                                strokeWidth={0}
                                className="custom-border-top overflow-hidden bg-swhite font-family-neue"
                            >
                                <motion.div
                                    variants={containerVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    className="flex flex-col justify-between w-full h-full"
                                >
                                    {movies.map((movie, i) => (
                                        <motion.div
                                            key={movie.id}
                                            className="relative flex items-center gap-2 px-3 border-[#afaca7] border-b border-dashed h-11 overflow-hidden cursor-pointer"
                                            whileHover="hover"
                                            initial="initial"
                                            animate="initial"
                                        >
                                            {/* Slide-up background overlay */}
                                            <motion.div
                                                variants={{
                                                    initial: { y: "100%" },
                                                    hover: { y: "0%" },
                                                }}
                                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                                className="top-0 left-0 z-0 absolute w-full h-full bg-[#d6d3cc]"
                                            />

                                            <motion.img
                                                src={movie.image}
                                                alt={movie.title}
                                                initial={{ x: "-250%" }}
                                                animate={{ x: 0 }}
                                                exit={{ x: "-250%" }}
                                                transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 * i }}
                                                className="z-10 rounded-xs w-4 h-4 object-cover"
                                            />

                                            <div className="z-10 overflow-hidden">
                                                <motion.p
                                                    initial={{ y: "100%" }}
                                                    animate={{ y: 0 }}
                                                    exit={{ y: "100%" }}
                                                    transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
                                                    className="-mb-[2px] text-xs leading-[95%]">
                                                    {movie.title}
                                                </motion.p>
                                            </div>

                                            <motion.div
                                                variants={{
                                                    initial: { scale: 0, opacity: 0, pointerEvents: "none" },
                                                    hover: { scale: 1, opacity: 1, pointerEvents: "auto" },
                                                }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className="right-5 z-10 absolute"
                                            >
                                                <ArrowButton />
                                            </motion.div>
                                        </motion.div>
                                    ))}

                                </motion.div>
                            </CustomDiv>
                        </motion.div>
                    )
                }
            </AnimatePresence>

            {/* Expanded state */}<AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 350 }}
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
                            >
                                <div className="top-0 left-0 absolute border border-stone-300 w-[9px] h-[9px] shadow" />
                                <div className="top-0 right-0 absolute border border-stone-300 w-[9px] h-[9px] shadow" />
                            </CustomDiv>

                            <CustomDiv
                                width={103}
                                height={40}
                                size={9}
                                strokeColor="white"
                                strokeWidth={0}
                                className="group relative flex justify-center items-center custom-border-top overflow-hidden bg-swhite font-family-neue hover:curs"
                            >
                                <div className="top-0 left-0 absolute border border-stone-300 w-[9px] h-[9px] shadow" />
                                <div className="top-0 right-0 absolute border border-stone-300 w-[9px] h-[9px] shadow" />
                            </CustomDiv>
                        </div>
                        <CustomDiv
                            width={341}
                            height={330}
                            size={9}
                            className="overflow-hidden bg-swhite"
                            strokeWidth={0}
                        >

                            <div className="bottom-0 left-0 absolute border border-stone-300 w-[9px] h-[9px] shadow" />
                            <div className="right-0 bottom-0 absolute border border-stone-300 w-[9px] h-[9px] shadow" />

                            <motion.div
                                variants={containerVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="flex flex-col w-full h-full"
                            >
                                {/* TOP: Navigation links */}
                                <div className="flex-1 px-[22px] pt-2.5">
                                    <div className="flex flex-col gap-0.5 uppercase leading-tight">
                                        {navItems.map((label, i) => {
                                            const isOtherHovered = hoveredIndex !== null && hoveredIndex !== i;
                                            return (
                                                <div
                                                    key={label}
                                                    className="overflow-hidden"
                                                    onMouseEnter={() => setHoveredIndex(i)}
                                                    onMouseLeave={() => setHoveredIndex(null)}
                                                >
                                                    <motion.div
                                                        variants={navItemVariants}
                                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                                        className={`flex items-baseline gap-2.5 hover:cursor-pointer transition-colors duration-200 text-black ${isOtherHovered ? "opacity-70" : "opacity-100"
                                                            }`}
                                                    >
                                                        <span className="text-[#7d7b77] text-xs">0{i + 1}</span>
                                                        <span className="text-[32px]">{label}</span>
                                                    </motion.div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div
                                    className="flex px-[22px] py-6 border-[#afaca7] border-t border-dashed"
                                >
                                    <div className="flex flex-row gap-10 text-xs leading-tight tracking-[1.5px]">
                                        {["COOKIE", "TERMS", "PRIVACY"].map((text, i) => (
                                            <div key={i} className="h-fit overflow-hidden">
                                                <motion.p
                                                    variants={itemVariants}
                                                    className="text-[#7d7b77] hover:text-black hover:cursor-pointer"
                                                >
                                                    {text}
                                                </motion.p>
                                            </div>
                                        ))}
                                    </div>
                                </div>


                                {/* SOCIALS */}
                                <div className="px-[22px] py-5 border-[#afaca7] border-t border-dashed">
                                    <div className="flex justify-start items-center gap-4">
                                        <img src="ig.svg" alt="Instagram" className="w-auto h-[22px] object-fill" />
                                        <img src="fb.svg" alt="Facebook" className="w-auto h-6 object-fill scale-110" />
                                        <img src="linkedin.svg" alt="LinkedIn" className="w-auto h-6 object-fill scale-120" />
                                    </div>
                                </div>

                                {/* COPYRIGHT */}
                                <div className="px-[22px] py-4 border-[#afaca7] border-t border-dashed">
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