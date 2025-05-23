"use client"

import { motion } from "motion/react";
import { CustomDiv } from "./customDiv";
import { useState } from "react";

const ChevronIcon: React.FC<{ color: string }> = ({ color }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 11 10" className="w-5 h-3">
      <path
        fill={color}
        d="M4.481.005a6.65 6.65 0 0 1 6.46 4.659c.078.229.08.479-.003.706C10.302 7.105 8.318 10 4.48 10V8.39c.941.127 2.922-.257 4.442-2.603H0V4.208h8.938c-.756-1.229-2.216-2.78-4.457-2.78V.006Z"
      />
    </svg>
  );
};

interface CustomButtonProps {
  height?: number;
  width1?: number;
  width2?: number;
  size?: number;
  children: React.ReactNode;
  mainclass: string;
  beforeclass?: string;
  afterclass?: string;
  strokeColor?: string;
  strokeWidth?: number;
  onClick?: () => void;
}


const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  mainclass,
  beforeclass,
  afterclass,
  onClick,
  height = 50,
  width1 = 150,
  width2 = 50,
  size = 6,
  strokeColor = "white",
  strokeWidth = 2,
}) => {

  const [hovering, setHovering] = useState(false);

  const playHoverSound = () => {
    const audio = new Audio('/sounds/cta_in.mp3');
    audio.volume = 0.5; // optional
    audio.playbackRate = 1; // optional
    audio.play();
  };

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => {
        playHoverSound();
        setHovering(true);
      }}
      whileHover="hover"
      onMouseLeave={() => setHovering(false)}
      initial="initial"
      animate="initial"
      className="flex flex-row justify-center w-full h-full hover:cursor-pointer"
    >
      {/* Text Container */}
      <CustomDiv height={height} width={width1} size={size}
        className={`overflow-hidden custom-border-left ${mainclass}`}
        strokeColor={strokeColor}
        strokeWidth={strokeWidth}
      >
        <div
          className={`relative w-full h-full ${hovering ? afterclass : beforeclass}`}
        >
          <div className="top-0 left-0 relative flex flex-col justify-center items-center w-full h-full">
            <div className="relative flex flex-col justify-start items-start w-fit h-3 overflow-hidden pt-[1px]">
              <motion.p className="relative h-3 font-family-neue text-[12px] uppercase leading-[96%] tracking-widest"
                variants={{
                  initial: { y: 0  },
                  hover: { y: "-100%" },
                }}
                transition={{ duration: 0.3 }}
              >
                {children}
              </motion.p>
              <motion.p className="h-3 font-family-neue text-[12px] uppercase leading-[96%] tracking-widest"
                variants={{
                  initial: { y: "10%"},
                  hover: { y: "-100%" },
                }}
                transition={{ duration: 0.3 }}
              >
                {children}
              </motion.p>
            </div>
          </div>


        </div>
      </CustomDiv>

      {/* Chevron Container */}
      <CustomDiv
        height={height}
        width={width2}
        size={size}
        strokeColor={strokeColor}
        strokeWidth={strokeWidth}
        className={`overflow-hidden custom-border-right ${mainclass}`}
      >
        <div
          className="relative w-full h-full"
        >
          <motion.div
            className={`absolute flex justify-center items-center w-full h-full ${beforeclass}`}
            variants={{
              initial: { x: 0, opacity: 1 },
              hover: { x: width2, opacity: 0 },
            }}
            transition={{ duration: 0.3 }}
          >
            <ChevronIcon color="white" />
          </motion.div>

          <motion.div
            className={`absolute flex justify-center items-center w-full h-full ${afterclass}`}
            variants={{
              initial: { x: -width2, opacity: 0 },
              hover: { x: 0, opacity: 1 },
            }}
            transition={{ duration: 0.3 }}
          >
            <ChevronIcon color="black" />
          </motion.div>
        </div>


      </CustomDiv>

    </motion.button >
  );
};

export default CustomButton;


