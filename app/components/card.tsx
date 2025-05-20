"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import CustomButton from "./customButton"

interface CardProps {
    image: string
    index: number
    yOffset: number
    scrollContainerRef: React.RefObject<HTMLDivElement | null>
    title: string
    director: string
}

const CARD_HEIGHT = 600

gsap.registerPlugin(ScrollTrigger)

const MovieCard: React.FC<CardProps> = ({
    image,
    index,
    yOffset,
    scrollContainerRef,
    title,
    director,
}) => {
    const cardRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLImageElement>(null)

    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (!cardRef.current || !imageRef.current || !scrollContainerRef.current) return

        const ctx = gsap.context(() => {
            gsap.to(imageRef.current, {
                y: -50,
                ease: "none",
                scrollTrigger: {
                    trigger: cardRef.current,
                    scroller: scrollContainerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            })
        }, cardRef)

        return () => ctx.revert()
    }, [scrollContainerRef])

    return (
        <div
            ref={cardRef}
            className="left-1/2 absolute"
            style={{
                transform: `translateX(-50%) translateY(${yOffset}px)`,
                width: "1300px",
                height: `${CARD_HEIGHT}px`,
                borderRadius: "1.5rem",
                overflow: "hidden",
                boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
            }}
        >
            <img
                ref={imageRef}
                src={image}
                alt={title}
                className="w-full h-full object-cover"
                style={{
                    transform: "scale(1.1)",
                    filter: "brightness(0.85) contrast(1.1) saturate(1.1)",
                }}
                draggable={false}
            />

            <div className="absolute inset-0 flex flex-row justify-between p-16 font-family-neue text-white">
                {/* Left section */}
                <div className="flex flex-col justify-between items-start h-full">
                    <div className="flex flex-col justify-center items-center gap-0">
                        <div className="font-medium text-[32px]">2024</div>
                        <div className="font-medium text-center uppercase leading-[100%]">World <br /> Premiere</div>

                        <img src="/filmfest.webp" alt="" className="mt-6 w-24" />
                    </div>

                    <div className="flex flex-col gap-5">
                        {/* Title */}
                        <div className="flex flex-col justify-center items-center gap-5">
                            <p className="font-family-parrish text-[10px] tracking-[2px]">DOCUMENTARY</p>
                            <h1 className="mb-2 font-medium text-8xl uppercase tracking-tight">{title}</h1>
                        </div>

                        <div className="flex flex-col gap-0 border-swhite border-t font-medium text-[19px] uppercase">
                            <div className="flex flex-row gap-5 pl-10 border-swhite border-b leading-[98%]">
                                <h2 className="-mt-[1px] -mb-[5px]">Director</h2>
                                <p className="-mt-[1px] -mb-[5px]">{director}</p>
                            </div>
                            <div className="flex flex-row gap-16 pl-20 border-swhite border-b leading-[98%]">
                                <h2 className="-mt-[1px] -mb-[5px]">Year</h2>
                                <p className="-mt-[1px] -mb-[5px]">2024</p>
                            </div>
                            <div className="flex flex-row gap-5 pl-16 border-swhite border-b leading-[98%]">
                                <h2 className="-mt-[1px] -mb-[5px]">Category</h2>
                                <p className="-mt-[1px] -mb-[5px]">Documentary</p>
                            </div>
                        </div>

                    </div>
                </div>


                {/* right section */}
                <div className="flex flex-col justify-between items-center">


                    {/* Ratings */}
                    <div className="flex flex-col justify-center items-center gap-5 w-1/8">
                        <div className="flex flex-col justify-center items-center">
                            <div className="font-family-parrish text-xs tracking-[2px]">FILM CRITIC</div>
                            <div className="mt-3 mb-1 font-medium text-xl text-center leading-[90%] tracking-tight">"A CINEMATIC MASTERPIECE"</div>
                            <div className="flex justify-center items-center mt-3">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className="text-xl">★</span>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <div className="font-family-parrish text-xs tracking-[2px]">FILM CRITIC</div>
                            <div className="mt-3 mb-1 font-medium text-xl text-center leading-[90%] tracking-tight">"A CINEMATIC MASTERPIECE"</div>
                            <div className="flex justify-center items-center mt-3">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className="text-xl">★</span>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <div className="font-family-parrish text-xs tracking-[2px]">FILM CRITIC</div>
                            <div className="mt-3 mb-1 font-medium text-xl text-center leading-[90%] tracking-tight">"A CINEMATIC MASTERPIECE"</div>
                            <div className="flex justify-center items-center mt-3">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className="text-xl">★</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div>

                        <CustomButton
                            children="Explore"
                            onClick={() => { }}
                            height={42}
                            width1={96}
                            width2={42}
                            size={5}
                            mainclass="text-[12px] leading-[0] tracking-widest uppercase font-family-neue"
                            beforeclass="bg-none text-swhite"
                            afterclass="bg-swhite text-black"
                            strokeColor="#FAF7EF"
                            strokeWidth={2}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieCard
