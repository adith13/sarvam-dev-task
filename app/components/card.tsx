"use client"

import type React from "react"
import { useRef, useState } from "react"
import CustomButton from "./customButton"
import MovieTitle from "./movieTitle"

interface CardProps {
    image: string;
    title: string;
    director: string;
}

const CARD_HEIGHT = 600

const MovieCard: React.FC<CardProps> = ({
    image,
    title,
    director,
}) => {
    const cardRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLImageElement>(null)

    // Parallax effect state
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculate position as percentage (0-1)
        const xPos = x / rect.width;
        const yPos = y / rect.height;
        
        // Calculate movement (smaller divisor = more movement)
        setMousePosition({
            x: (xPos - 0.5) * 30, // 15px max movement
            y: (yPos - 0.5) * 20  // 10px max movement
        });
    };

    const handleMouseLeave = () => {
        setMousePosition({ x: 0, y: 0 });
    };

    return (
        <>
            <svg width="0" height="0">
                <clipPath id="kafkaClip" clipPathUnits="userSpaceOnUse">

                <path d="M1291.19 0.453125C1314.67 0.501087 1333.55 17.929 1334.57 41.3643C1336.17 78.0828 1335.83 128.234 1336.86 185.407L1336.96 190.962C1339.62 327.366 1339.35 492.452 1333 551.787C1331.43 566.5 1320.29 576.975 1305.55 578.536C1221 587.489 910.939 593.912 615.898 594.505C468.385 594.801 324.637 593.64 214.723 590.609C159.765 589.094 113.27 587.111 78.9951 584.61C61.8568 583.36 47.7799 581.98 37.2305 580.466C31.9555 579.708 27.5689 578.919 24.126 578.096C20.8878 577.322 18.5177 576.526 17.0293 575.72L16.7432 575.559C10.4294 571.837 6.39775 564.535 3.92676 553.784C1.45737 543.04 0.567314 528.942 0.460938 511.756C0.3546 494.574 1.03116 474.339 1.68262 451.327C2.29325 429.757 2.88148 405.756 2.78125 379.565L2.75195 374.298C2.30513 313.628 1.01325 247.056 1.02148 188.204C1.02973 129.344 2.33892 78.2594 7.08496 48.5684C9.9218 30.8219 23.8314 13.0689 41.4619 10.1963C63.7568 6.56383 100.131 5.29971 146.636 5.34961C193.131 5.3995 249.721 6.76294 312.433 8.37988C437.85 11.6136 587.743 15.8603 730.267 12.6299L730.266 12.6289C856.864 12.4369 971.714 9.34149 1067.61 6.31934C1163.51 3.29692 1240.43 0.349453 1291.19 0.453125Z" stroke="black"/>
                </clipPath>
            </svg>

            <div
                ref={cardRef}
                className="relative w-full overflow-hidden transition-transform duration-300 ease-out"
                style={{
                    height: `${CARD_HEIGHT}px`,
                    width: "1340px",
                    borderRadius: "1.5rem",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
                    clipPath: "url(#kafkaClip)", // Apply your custom clip path
                    transform: `perspective(1000px) rotateX(${mousePosition.y * -0.5}deg) rotateY(${mousePosition.x * 0.5}deg)`,
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <div 
                    className="absolute inset-0 w-full h-full transition-transform duration-300 ease-out"
                    style={{
                        transform: `translateX(${mousePosition.x * -1}px) translateY(${mousePosition.y * -1}px) scale(1.05)`,
                    }}
                >
                    <img
                        ref={imageRef}
                        src={image}
                        alt={title}
                        className="absolute inset-0 w-full h-full object-cover origin-center select-none"
                        style={{
                            transform: 'scale(1.0)',
                            filter: "brightness(0.85) contrast(1.1) saturate(1.1)",
                            willChange: "transform",
                        }}
                        draggable={false}
                    />
                </div>

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