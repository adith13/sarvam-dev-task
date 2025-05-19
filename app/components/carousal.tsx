"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

type CarouselImage = {
  id: number;
  src: string;
  alt: string;
};

const IMAGES = [
  {
    id: 1,
    src: 'https://cdn.cosmos.so/0262f3e8-cfce-44ba-a08a-d67b0df2de92?format=jpeg',
    alt: 'Carousel image 1'
  },
  {
    id: 2,
    src: 'https://cdn.cosmos.so/fc5ac665-12e9-43cd-a15e-42e452da6042?format=jpeg',
    alt: 'Carousel image 2'
  },
  {
    id: 3,
    src: 'https://cdn.cosmos.so/86ef199a-71ba-4f6d-b0c8-ea3a4870f269?format=jpeg',
    alt: 'Carousel image 3'
  },
  {
    id: 4,
    src: 'https://cdn.cosmos.so/e42117c6-7f07-4812-b7e8-7b0c58694aef?format=jpeg',
    alt: 'Carousel image 4'
  },
  {
    id: 5,
    src: 'https://cdn.cosmos.so/8497ef2b-aa76-41af-9081-46a9bf4d541a?format=jpeg',
    alt: 'Carousel image 5'
  },
];

export default function FilmRollCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const lastScrollTime = useRef(0);
  const lastScrollTop = useRef(0);
  const animationFrame = useRef<number | null>(null);
  // Duplicate images for infinite scroll effect
  const extendedImages = [...IMAGES, ...IMAGES, ...IMAGES];
  const itemHeight = 400; // Height of each image item
  const totalHeight = extendedImages.length * itemHeight;

  // Handle mouse/touch start
  const handleStart = (clientY: number) => {
    setIsDragging(true);
    setStartY(clientY);
    setScrollSpeed(0);
    if (containerRef.current) {
      setScrollTop(containerRef.current.scrollTop);
    }
    cancelAnimationFrame(animationFrame.current!);
  };

  // Handle mouse/touch move
  const handleMove = useCallback((clientY: number) => {
    if (!isDragging || !containerRef.current) return;
    
    const now = Date.now();
    const timeDiff = now - lastScrollTime.current;
    
    if (timeDiff > 0) {
      const currentScroll = containerRef.current.scrollTop;
      const velocity = (currentScroll - lastScrollTop.current) / timeDiff;
      setScrollSpeed(velocity);
      lastScrollTop.current = currentScroll;
      lastScrollTime.current = now;
    }
    
    const y = clientY - startY;
    containerRef.current.scrollTop = scrollTop - y;
  }, [isDragging, scrollTop, startY]);

  // Handle mouse/touch end
  const handleEnd = useCallback(() => {
    if (!isDragging || !containerRef.current) return;
    
    setIsDragging(false);
    
    // Apply momentum scrolling based on speed
    if (Math.abs(scrollSpeed) > 0.1) {
      const momentum = scrollSpeed * 2000; // Adjust multiplier for momentum strength
      let targetScroll = containerRef.current.scrollTop - momentum;
      
      // Apply easing and snap to nearest item
      const snapTo = Math.round(targetScroll / itemHeight) * itemHeight;
      
      // Ensure we stay within bounds
      const maxScroll = totalHeight - containerRef.current.clientHeight;
      const finalScroll = Math.max(0, Math.min(snapTo, maxScroll));
      
      containerRef.current.scrollTo({
        top: finalScroll,
        behavior: 'smooth'
      });
    } else {
      // Snap to nearest item if speed is low
      const snapTo = Math.round(containerRef.current.scrollTop / itemHeight) * itemHeight;
      containerRef.current.scrollTo({
        top: snapTo,
        behavior: 'smooth'
      });
    }
  }, [isDragging, itemHeight, scrollSpeed, totalHeight]);

  // Set up event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseDown = (e: MouseEvent) => handleStart(e.clientY);
    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientY);
    const handleMouseUp = () => handleEnd();
    const handleTouchStart = (e: TouchEvent) => handleStart(e.touches[0].clientY);
    const handleTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientY);
    const handleTouchEnd = () => handleEnd();

    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mouseleave', handleMouseUp);
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);

    // Initial scroll to center
    container.scrollTop = (totalHeight - container.clientHeight) / 2;

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mouseleave', handleMouseUp);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      cancelAnimationFrame(animationFrame.current!);
    };
  }, [handleEnd, handleMove, totalHeight]);

  // Handle infinite scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      // When near the top, wrap to bottom
      if (container.scrollTop < itemHeight) {
        container.scrollTop = totalHeight - (container.clientHeight * 2);
      }
      // When near the bottom, wrap to top
      else if (container.scrollTop > totalHeight - container.clientHeight - itemHeight) {
        container.scrollTop = container.clientHeight;
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [itemHeight, totalHeight]);

  return (
    <div className="w-full h-screen overflow-hidden bg-black">
      <div 
        ref={containerRef}
        className="w-full h-full overflow-y-auto snap-mandatory snap-y scrollbar-hide"
        style={{
          scrollSnapType: 'y mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollBehavior: isDragging ? 'auto' : 'smooth',
        }}
      >
        <div className="flex flex-col">
          {extendedImages.map((image, index) => (
            <div 
              key={`${image.id}-${index}`} 
              className="relative w-full h-[80vh] snap-start"
              style={{
                minHeight: '100vh',
                scrollSnapAlign: 'start',
              }}
            >
              <div className="top-0 sticky flex justify-center items-center p-4 h-screen">
                <div className="relative rounded-lg w-full h-[80vh] overflow-hidden shadow-2xl">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover pointer-events-none"
                    priority={index < 5}
                    sizes="(max-width: 768px) 90vw, 70vw"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
