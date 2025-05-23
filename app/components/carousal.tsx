"use client";

import { useRef, useEffect } from "react";
import MovieCard from "./card";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable, InertiaPlugin);
}

const ITEM_HEIGHT = 630;

const movies = [
  { id: 1, image: "https://film-grab.com/wp-content/uploads/2020/04/08-752.jpg", title: "TABOO", director: "SHAULY MELAMED" },
  { id: 2, image: "https://cdn.cosmos.so/fc5ac665-12e9-43cd-a15e-42e452da6042?format=jpeg", title: "ANA MAXIM", director: "GUY RITCHIE" },
  { id: 3, image: "https://cdn.cosmos.so/86ef199a-71ba-4f6d-b0c8-ea3a4870f269?format=jpeg", title: "OUTSIDER FREUD", director: "Chris Nolan" },
  { id: 4, image: "https://cdn.cosmos.so/e42117c6-7f07-4812-b7e8-7b0c58694aef?format=jpeg", title: "SAVOY", director: "Tony Stark" },
  { id: 5, image: "https://cdn.cosmos.so/8497ef2b-aa76-41af-9081-46a9bf4d541a?format=jpeg", title: "SARVAM", director: "Adith Narein" },
];

const FilmRollCarousel = () => {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = listRef.current;
    if (!container) return;

    const totalHeight = movies.length * ITEM_HEIGHT;
    const centerOffset = window.innerHeight / 2 - ITEM_HEIGHT / 2;
    const initialY = centerOffset;

    gsap.set(container, { y: initialY });

    const minY = window.innerHeight - totalHeight;
    const maxY = centerOffset;
    const clampY = gsap.utils.clamp(minY, maxY);

    let _y = initialY;
    console.log("_y", _y);

    const applyCardEffects = (currentY: number) => {
      movies.forEach((_, index) => {
        const imageId = `card-${index}`;
        const contentId = `content-${index}`;
        const img = document.getElementById(imageId);
        const content = document.getElementById(contentId);

        const cardWrapper = container.children[index];
        const cardElement = cardWrapper?.firstElementChild as HTMLElement;

        if (!img || !cardElement || !content) return;

        const cardAbsoluteY = currentY + index * ITEM_HEIGHT + ITEM_HEIGHT / 2;
        const distanceFromCenter = cardAbsoluteY - window.innerHeight / 2;

        const parallaxOffset = distanceFromCenter * 0.35;

        gsap.set(img, {
          y: -parallaxOffset,
        });

        const maxDistanceForEffect = ITEM_HEIGHT * 1.5;
        const normalizedDistance = Math.min(1, Math.abs(distanceFromCenter) / maxDistanceForEffect);
        const scale = gsap.utils.mapRange(0, 1, 1, 0.8)(normalizedDistance);
        const opacity = gsap.utils.mapRange(0, 1, 1, 0.5)(normalizedDistance);

        gsap.set(cardElement, {
          scale,
          opacity,
        });

        gsap.set(content, {
          y: parallaxOffset,
        });
      });
    };

    const dragInstance = Draggable.create(container, {
      type: "y",
      inertia: true,
      bounds: { minY, maxY },
      snap: {
        y: (y) => {
          const snappedY = Math.round((y - initialY) / ITEM_HEIGHT) * ITEM_HEIGHT + initialY;
          return clampY(snappedY);
        },
      },
      onPress: function () {
        _y = this.y;
      },
      onDrag: function () {
        _y = this.y;
      },
      onRelease: function () {
        _y = this.y;
      },
    })[0];

    const update = () => {
      const currentY = clampY(gsap.getProperty(container, "y") as number);
      applyCardEffects(currentY);
    };

    gsap.ticker.add(update);

    return () => {
      dragInstance?.kill();
      gsap.ticker.remove(update);
    };
  }, []);


  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <div className="top-0 z-50 absolute w-full h-[200px] bg-gradient-to-b from-black to-transparent" />
      <div className="bottom-0 z-50 absolute w-full h-[200px] bg-gradient-to-t from-black to-transparent" />

      <div
        ref={listRef}
        className="flex flex-col items-center cursor-grab will-change-transform"
        style={{ touchAction: "none", userSelect: "none" }}
      >
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            className="flex flex-col justify-center items-center w-11/12 overflow-hidden"
            style={{ height: `${ITEM_HEIGHT}px` }}
          >
            <MovieCard
              image={movie.image}
              title={movie.title}
              director={movie.director}
              index={index}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilmRollCarousel;