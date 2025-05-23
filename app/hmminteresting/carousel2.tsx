"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import MovieCard from "./card2";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable, InertiaPlugin);
}

const ITEM_HEIGHT = 630;

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

const FilmRollCarousel2 = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const fullList = [...movies, ...movies];
  const numOriginalMovies = movies.length;
//   let _currentLogicalY = 0;

  useEffect(() => {
    const container = listRef.current;
    if (!container) return;

    const totalHeightOfOneSet = numOriginalMovies * ITEM_HEIGHT;
    const centerOffset = window.innerHeight / 2 - ITEM_HEIGHT / 2;

    const initialY = centerOffset - (numOriginalMovies * ITEM_HEIGHT);
    gsap.set(container, { y: initialY });

    const wrapMin = -totalHeightOfOneSet;
    const wrapMax = 0;

    // _currentLogicalY = initialY;

    const dragInstance = Draggable.create(container, {
      type: "y",
      inertia: true,
      snap: {
        y: (y) => {
          const logicalY = y - initialY;
          const nearestIndex = Math.round(logicalY / ITEM_HEIGHT);
          const snappedLogicalY = nearestIndex * ITEM_HEIGHT;
          const targetPhysicalY = snappedLogicalY + initialY;
          const wrappedY = gsap.utils.wrap(wrapMin, wrapMax, targetPhysicalY);

          return wrappedY;
        },
      },
      
      wrapY: [wrapMin, wrapMax],
    //   onDrag: function () {
    //     _currentLogicalY = this.y - initialY;
    //   },
    //   onThrowUpdate: function () {
    //     _currentLogicalY = this.y - initialY;
    //   },
    //   onThrowComplete: function () {
    //     _currentLogicalY = this.y - initialY;
    //   },
    //   onPress: function () {
    //     _currentLogicalY = this.y - initialY;
    //   },
    })[0];

    return () => {
      dragInstance?.kill();
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
        {fullList.map((movie, index) => (
          <div
            key={`${movie.id}-${index}`}
            className="flex flex-col justify-center items-center w-11/12"
            style={{ height: `${ITEM_HEIGHT}px` }}
          >
            <MovieCard
              image={movie.image}
              title={movie.title}
              director={movie.director}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilmRollCarousel2;