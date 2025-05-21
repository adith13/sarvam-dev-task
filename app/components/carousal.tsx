"use client";

import { useRef, useEffect, useState } from "react";
import MovieCard from "./card";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

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

const FilmRollCarousel = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const fullList = [...movies, ...movies, ...movies]; // prev + main + next
  const numOriginalMovies = movies.length; // Number of items in one logical set
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let _currentLogicalY = 0; // Initialize with the physical starting position

  useEffect(() => {
    const container = listRef.current;
    if (!container) return;

    const totalHeightOfOneSet = numOriginalMovies * ITEM_HEIGHT;
    const centerOffset = window.innerHeight / 2 - ITEM_HEIGHT / 2;

    // The initial Y position to place the *middle* set of movies centered.
    // We want the element that corresponds to the 'numOriginalMovies' index
    // (the first item of the main copy) to be visually centered.
    // If the list started at Y=0, this item would be at Y = numOriginalMovies * ITEM_HEIGHT.
    // To center it, we need to shift the whole container by:
    // (centerOffset - (numOriginalMovies * ITEM_HEIGHT))
    const initialY = centerOffset - (numOriginalMovies * ITEM_HEIGHT);
    gsap.set(container, { y: initialY });

    // Define the wrap range for the *virtual* loop.
    // This range corresponds to the height of a single set of original movies.
    // When the Draggable's 'y' property (the container's transform) goes outside this range,
    // Draggable.wrap will automatically adjust it back into the range, creating the loop.
    // The range represents the positions relative to the *top* of the full list.
    // Example: if 3 items, ITEM_HEIGHT=100. totalHeightOfOneSet=300.
    // wrapMin = -300, wrapMax = 0.
    // When y is -300, it's at the start of a "virtual" copy.
    // When y is 0, it's at the end of a "virtual" copy.
    const wrapMin = -totalHeightOfOneSet;
    const wrapMax = 0;

    // This variable tracks the *logical* scroll position, which is unbounded and continuous.
    // It's essential for correct snapping across the wrapped jumps.
    _currentLogicalY = initialY; // Initialize with the physical starting position

    const dragInstance = Draggable.create(container, {
      type: "y",
      inertia: true,
      // `liveSnap` can also be used here if you want items to snap during the drag itself.
      // snap is applied on drag end and throw complete.
      snap: {
        y: (y) => {
          // Compute logical scroll position from physical y
          const logicalY = y - initialY;

          // Nearest card index based on current scroll position
          const nearestIndex = Math.round(logicalY / ITEM_HEIGHT);

          // Compute snapped logical Y
          const snappedLogicalY = nearestIndex * ITEM_HEIGHT;

          // Convert logical to physical Y (with initialY as base)
          const targetPhysicalY = snappedLogicalY + initialY;

          // Wrap it so it stays within visual loop
          const wrappedY = gsap.utils.wrap(wrapMin, wrapMax, targetPhysicalY);

          return wrappedY;
        },
      },
      
      // Crucial for infinite loop: When y goes outside [wrapMin, wrapMax], it "teleports".
      // Note: wrapY operates on the *element's transform* directly, ensuring seamless visual transition
      wrapY: [wrapMin, wrapMax],
      onDrag: function () {
        _currentLogicalY = this.y - initialY;
      },
      onThrowUpdate: function () {
        _currentLogicalY = this.y - initialY;
      },
      onThrowComplete: function () {
        // Snap the logicalY based on actual snapped value
        _currentLogicalY = this.y - initialY;
      },
      onPress: function () {
        _currentLogicalY = this.y - initialY;
      },
      
      // Optional: Add `bounds` if you want to limit how far the user can initially drag
      // before the wrapping takes over, but `wrapY` already handles the main looping.
      // bounds: {
      //   minY: initialY - totalHeightOfOneSet,
      //   maxY: initialY + totalHeightOfOneSet,
      // },
    })[0];

    return () => {
      dragInstance?.kill();
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Gradients to hide the top/bottom cut-off of items */}
      <div className="top-0 z-50 absolute w-full h-[200px] bg-gradient-to-b from-black to-transparent" />
      <div className="bottom-0 z-50 absolute w-full h-[200px] bg-gradient-to-t from-black to-transparent" />

      <div
        ref={listRef}
        className="flex flex-col items-center cursor-grab will-change-transform"
        style={{ touchAction: "none", userSelect: "none" }}
        onScroll={() => setScrollY(listRef.current?.scrollTop || 0)}
      >
        {fullList.map((movie, index) => (
          <div
            key={`${movie.id}-${index}`}
            className="flex justify-center items-center w-11/12"
            style={{ height: `${ITEM_HEIGHT}px` }}
          >
            <MovieCard
              image={movie.image}
              title={movie.title}
              director={movie.director}
              index={index} // This index is the *physical* index in fullList
              yOffset={scrollY + (index * ITEM_HEIGHT)}
              scrollContainerRef={listRef}
              totalItems={fullList.length}
              itemHeight={ITEM_HEIGHT}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilmRollCarousel;