"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import gsap from "gsap"

interface PathButtonProps {
  buttonText: string
  onClick?: () => void
  width?: number | string
  height?: number | string
  className?: string
  iconOnly?: boolean
  borderColor?: string
  textColor?: string
  hoverBgColor?: string
  hoverTextColor?: string
  initialAnimation?: boolean
  animationDelay?: number
}

const PathButton: React.FC<PathButtonProps> = ({
  buttonText,
  onClick,
  width = "auto",
  height = 44,
  className = "",
  iconOnly = false,
  borderColor = "white",
  textColor = "white",
  hoverBgColor = "white",
  hoverTextColor = "black",
  initialAnimation = true,
  animationDelay = 0,
}) => {
  const buttonRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Calculate dimensions
  const buttonWidth = typeof width === "number" ? `${width}px` : width
  const buttonHeight = typeof height === "number" ? height : 44
  const dividerPosition = iconOnly ? 0 : 75 // Percentage position of divider

  useEffect(() => {
    if (initialAnimation && buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, delay: animationDelay },
      )
    }
  }, [initialAnimation, animationDelay])

  useEffect(() => {
    if (!buttonRef.current) return

    // Text animation
    if (textRef.current) {
      gsap.to(textRef.current.querySelector(".text-top"), {
        y: isHovered ? "-100%" : "0%",
        duration: 0.3,
      })
      gsap.to(textRef.current.querySelector(".text-bottom"), {
        y: isHovered ? "-100%" : "0%",
        duration: 0.3,
      })
    }

    // Icon animation
    if (iconRef.current) {
      gsap.to(iconRef.current.querySelector(".icon-dark"), {
        x: isHovered ? "100%" : "-25%",
        duration: 0.3,
      })
      gsap.to(iconRef.current.querySelector(".icon-light"), {
        x: isHovered ? "100%" : "0%",
        duration: 0.3,
      })
    }

    // Background color animation
    gsap.to(contentRef.current, {
      backgroundColor: isHovered ? hoverBgColor : "transparent",
      color: isHovered ? hoverTextColor : textColor,
      duration: 0.3,
    })
  }, [isHovered, hoverBgColor, hoverTextColor, textColor])

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick()
    }
    // Add click animation
    gsap.to(buttonRef.current, {
      scale: 0.95,
      duration: 0.1,
      onComplete: () => {
        gsap.to(buttonRef.current, {
          scale: 1,
          duration: 0.1,
        })
      },
    })
  }

  // SVG path for button shape
  const buttonPath =
    "M5 1h90c0 1 .6 3 3 3s3-2 3-3h36c0 3.2 2.667 4.144 4 4.216V39c-3.2 0-4 2.667-4 4h-35c0-1.333-.8-4-4-4s-4 2.667-4 4H5c0-3.6-2.667-4.167-4-4V5c3.2 0 4-2.667 4-4Z"

  return (
    <div
      ref={buttonRef}
      className={`relative cursor-pointer ${className}`}
      style={{ width: buttonWidth, height: buttonHeight }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* SVG for clipping and border */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 142 44"
        className="top-0 left-0 absolute w-full h-full"
        style={{ pointerEvents: "none" }}
      >
        <defs>
          <clipPath id="buttonClip">
            <path d={buttonPath} />
          </clipPath>
        </defs>

        {/* Border path */}
        <path d={buttonPath} stroke={borderColor} fill="transparent" strokeWidth="1" />

        {/* Divider line */}
        {!iconOnly && <path d={`M${dividerPosition} 4.5v34`} stroke={borderColor} strokeDasharray="4" />}
      </svg>

      {/* Content container with clip-path */}
      <div
        ref={contentRef}
        className="top-0 left-0 absolute flex w-full h-full"
        style={{
          clipPath: "url(#buttonClip)",
          transition: "background-color 0.3s, color 0.3s",
        }}
      >
        {/* Text section */}
        {!iconOnly && (
          <div
            ref={textRef}
            className="flex flex-grow justify-center items-center overflow-hidden"
            style={{ height: "100%" }}
          >
            <div className="flex flex-col justify-start items-center px-7 w-full h-5 overflow-hidden">
              <div className="flex flex-col justify-center items-center py-1 h-fit text-[13px] text-top uppercase leading-[100%] tracking-widest">
                <span>{buttonText}</span>
              </div>
              <div className="text-bottom flex flex-col justify-center items-center py-1 h-fit text-[13px] uppercase leading-[100%] tracking-widest">
                <span>{buttonText}</span>
              </div>
            </div>
          </div>
        )}

        {/* Icon section */}
        <div
          ref={iconRef}
          className="flex justify-center items-center"
          style={{
            width: iconOnly ? "100%" : "44px",
            height: "100%",
            marginLeft: "auto",
          }}
        >
          <div className="relative flex flex-row justify-end items-center w-5 h-full overflow-hidden">
            <div className="absolute flex flex-row justify-center items-center icon-dark">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 11 10" className="w-5 h-3">
                <path
                  fill={hoverTextColor}
                  d="M4.481.005a6.65 6.65 0 0 1 6.46 4.659c.078.229.08.479-.003.706C10.302 7.105 8.318 10 4.48 10V8.39c.941.127 2.922-.257 4.442-2.603H0V4.208h8.938c-.756-1.229-2.216-2.78-4.457-2.78V.006Z"
                />
              </svg>
            </div>
            <div className="absolute flex flex-row justify-center items-center icon-light">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 11 10" className="w-5 h-3">
                <path
                  fill={textColor}
                  d="M4.481.005a6.65 6.65 0 0 1 6.46 4.659c.078.229.08.479-.003.706C10.302 7.105 8.318 10 4.48 10V8.39c.941.127 2.922-.257 4.442-2.603H0V4.208h8.938c-.756-1.229-2.216-2.78-4.457-2.78V.006Z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PathButton