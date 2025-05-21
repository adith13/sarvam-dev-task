"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Draggable } from "gsap/Draggable"
import CustomButton from "./customButton"
import MovieTitle from "./movieTitle"

interface CardProps {
    image: string;
    index: number;
    yOffset: number;
    scrollContainerRef: React.RefObject<HTMLDivElement | null>;
    title: string;
    director: string;
    totalItems: number;
    itemHeight: number;
}

const CARD_HEIGHT = 600

gsap.registerPlugin(ScrollTrigger, Draggable)

const MovieCard: React.FC<CardProps> = ({
    image,
    index,
    yOffset,
    scrollContainerRef,
    title,
    director,
    totalItems,
    itemHeight,
}) => {
    const cardRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        if (!imageRef.current) return;

        // Calculate the card's position in the carousel (0 to 1)
        const progress = yOffset / ((totalItems * itemHeight) - window.innerHeight);
        
        // Only apply parallax if the card is in or near the viewport
        const cardPosition = (index * itemHeight) / (totalItems * itemHeight);
        const viewportProgress = 1 - Math.abs(progress - cardPosition) * 2;
        
        if (viewportProgress > 0) {
            // Apply parallax effect based on card's position in the carousel
            const parallaxAmount = 20 * viewportProgress;
            gsap.to(imageRef.current, {
                yPercent: -parallaxAmount,
                ease: "none",
                overwrite: true,
                duration: 0.1
            });
        }

        // Setup a scroll event listener for smooth updates
        const onScroll = () => {
            const newProgress = (scrollContainerRef.current?.scrollTop || 0) / ((totalItems * itemHeight) - window.innerHeight);
            const newViewportProgress = 1 - Math.abs(newProgress - cardPosition) * 2;
            
            if (newViewportProgress > 0) {
                const parallaxAmount = 20 * newViewportProgress;
                gsap.to(imageRef.current, {
                    yPercent: -parallaxAmount,
                    ease: "none",
                    overwrite: true,
                    duration: 0.1
                });
            }
        };

        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', onScroll);
        }

        return () => {
            if (container) {
                container.removeEventListener('scroll', onScroll);
            }
        };
    }, [yOffset, index, totalItems, itemHeight, scrollContainerRef])

    return (
        <>
            <svg width="0" height="0">
                <clipPath id="kafkaClip" clipPathUnits="userSpaceOnUse">
                    <path d="M1290.17 1.43652C1344.88 -0.561488 1396.54 42.381 1397.23 97.041C1397.73 136.392 1397.8 182.58 1398.5 232.955L1398.65 243.085C1401.48 425.103 1400.74 643.288 1393.95 718.938C1392.34 736.972 1380.67 749.681 1362.68 751.409C1269.71 760.344 947.947 759.428 642.174 756.274C336.431 753.122 46.7062 747.733 17.8745 747.733C14.7454 747.733 12.1532 746.051 9.99756 742.675C7.8314 739.282 6.14462 734.23 4.85791 727.639C2.286 714.464 1.34647 695.327 1.21826 671.518C1.0901 647.716 1.77215 619.283 2.43213 587.527C3.0508 557.76 3.65021 525.078 3.54346 490.573L3.51221 483.648C3.02856 401.249 1.59875 310.538 1.70947 231.364C1.82021 152.179 3.47278 84.5914 9.146 48.4297C12.0833 29.7071 25.7034 14.0119 44.3745 11.2119C67.7613 7.70495 105.615 6.3455 153.977 6.14844C202.329 5.95142 261.154 6.91678 326.468 8.05371C457.088 10.3274 613.652 13.2863 764.242 9.00391L764.243 9.00488C972.303 8.60929 1172.82 5.72202 1290.17 1.43652Z" stroke="black" />
                </clipPath>
            </svg>

            <div
                ref={cardRef}
                className="relative w-full overflow-hidden"
                style={{
                    height: `${CARD_HEIGHT}px`,
                    borderRadius: "1.5rem",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
                    clipPath: "url(#kafkaClip)", // Apply your custom clip path
                }}
            >
                <img
                    ref={imageRef}
                    src={image}
                    alt={title}
                    className="right-0 left-0 z-0 absolute w-full h-full object-cover origin-center select-none"
                    style={{
                        transform: `scale(1.25)`, // Keep scaled up
                        filter: "brightness(0.85) contrast(1.1) saturate(1.1)",
                        willChange: "transform",
                    }}
                    draggable={false}
                />

                <div className="z-10 absolute inset-0 flex flex-row justify-between p-16 font-family-neue text-white">
                    {/* Left section */}
                    <div className="flex flex-col justify-between items-start h-full select-none">
                        <div className="flex flex-col justify-center items-center gap-0">
                            <div className="font-medium text-[32px]">2024</div>
                            <div className="font-medium text-center uppercase leading-[100%]">World <br /> Premiere</div>
                            <img src="/filmfest.webp" alt="" className="mt-6 w-24" />
                        </div>

                        <div className="flex flex-col gap-5">
                            {/* Title */}
                            <div className="flex flex-col justify-center items-center gap-5">
                                <p className="font-family-parrish text-[10px] tracking-[2px]">DOCUMENTARY</p>
                                <div className="flex flex-col items-center gap-0">
                                    {title.split(' ').map((word, index) => (
                                        <MovieTitle key={index} title={word} />
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col gap-0 border-swhite border-t font-medium text-[20px] uppercase">
                                <div className="flex flex-row gap-20 pl-5 border-swhite border-b-2 leading-[98%]">
                                    <h2 className="-mt-[1px] -mb-[5px]">Director</h2>
                                    <p className="-mt-[1px] -mb-[5px]">{director}</p>
                                </div>
                                <div className="flex flex-row gap-32 pl-16 border-swhite border-b-2 leading-[98%]">
                                    <h2 className="-mt-[1px] -mb-[5px]">Year</h2>
                                    <p className="-mt-[1px] -mb-[5px]">2024</p>
                                </div>
                                <div className="flex flex-row gap-20 pl-10 border-swhite border-b-2 leading-[98%]">
                                    <h2 className="-mt-[1px] -mb-[5px]">Category</h2>
                                    <p className="-mt-[1px] -mb-[5px]">Documentary</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* right section */}
                    <div className="flex flex-col justify-between items-center w-1/6">
                        {/* Ratings */}
                        <div className="flex flex-col justify-center items-center gap-5 w-fit select-none">
                            <div className="flex flex-col justify-center items-center">
                                <div className="font-family-parrish text-xs tracking-[2px]">FILM CRITIC</div>
                                <div className="mt-3 mb-1 font-medium text-xl text-center leading-[90%] tracking-tight">&ldquo;A CINEMATIC MASTERPIECE&ldquo;</div>
                                <div className="flex justify-center items-center mt-3">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className="text-xl">★</span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <div className="font-family-parrish text-xs tracking-[2px]">FILM CRITIC</div>
                                <div className="mt-3 mb-1 font-medium text-xl text-center leading-[90%] tracking-tight">&ldquo;A CINEMATIC MASTERPIECE&ldquo;</div>
                                <div className="flex justify-center items-center mt-3">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className="text-xl">★</span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <div className="font-family-parrish text-xs tracking-[2px]">FILM CRITIC</div>
                                <div className="mt-3 mb-1 font-medium text-xl text-center leading-[90%] tracking-tight">&ldquo;A CINEMATIC MASTERPIECE&ldquo;</div>
                                <div className="flex justify-center items-center mt-3">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className="text-xl">★</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div>
                            <CustomButton
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
                            >
                                <span>Explore</span>
                            </CustomButton>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MovieCard