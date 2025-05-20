import Loader from "./components/loader";
import React from "react";
import MovieCard from "./components/card";
import Navbar from "./components/navbar";

export default function Home() {

  const movies = [
    {
      id: 1,
      image: 'https://cdn.cosmos.so/0262f3e8-cfce-44ba-a08a-d67b0df2de92?format=jpeg',
      title: 'Movie Title 1',
      director: 'Director 1',
      yOffset: 0,
      scrollContainerRef: React.createRef<HTMLDivElement>(),
    },
    {
      id: 2,
      image: 'https://cdn.cosmos.so/fc5ac665-12e9-43cd-a15e-42e452da6042?format=jpeg',
      title: 'Movie Title 2',
      director: 'Director 2',
      yOffset: 100,
      scrollContainerRef: React.createRef<HTMLDivElement>(),
    },
    {
      id: 3,
      image: 'https://cdn.cosmos.so/86ef199a-71ba-4f6d-b0c8-ea3a4870f269?format=jpeg',
      title: 'Movie Title 3',
      director: 'Director 3',
      yOffset: 200,
      scrollContainerRef: React.createRef<HTMLDivElement>(),
    },
    {
      id: 4,
      image: 'https://cdn.cosmos.so/e42117c6-7f07-4812-b7e8-7b0c58694aef?format=jpeg',
      title: 'Movie Title 4',
      director: 'Director 4',
      yOffset: 300,
      scrollContainerRef: React.createRef<HTMLDivElement>(),
    },
    {
      id: 5,
      image: 'https://cdn.cosmos.so/8497ef2b-aa76-41af-9081-46a9bf4d541a?format=jpeg',
      title: 'Movie Title 5',
      director: 'Director 5',
      yOffset: 400,
      scrollContainerRef: React.createRef<HTMLDivElement>(),
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center w-full h-full min-h-screen bg-black">
      <Loader />
      {/* <Carousel /> */}
      <Navbar />
      <div className="flex flex-col justify-center items-center w-full h-full min-h-screen bg-black">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            image={movie.image}
            title="Movie Title"
            director="Director Name" index={0} yOffset={0} scrollContainerRef={movie.scrollContainerRef} />
        ))}
      </div>




    </div>
  );
}
