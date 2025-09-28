import React, { useState } from "react";
import { dummyTrailers } from "../assets/assets"; // Each trailer: { title, image, videoId }
import BlurCircle from "./BlurCircle";
import { PlayCircleIcon } from "lucide-react";

const TrailerSection = () => {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden">
      <p className="text-gray-100 font-medium text-lg max-w-[12000px] mx-auto">
        Trailers
      </p>

      {/* Main Trailer Player using YouTube iframe */}
      <div className="relative mt-8">
        <BlurCircle top="-100px" right="-100px" />
        <div className="mx-auto max-w-full rounded-lg shadow-lg overflow-hidden">
          <iframe
            width="80%"
            height="540"
            src={`https://www.youtube.com/embed/${currentTrailer.videoId}?autoplay=1&mute=1&loop=1&playlist=${currentTrailer.videoId}`}
            title={currentTrailer.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            mute="1"
          ></iframe>
        </div>
      </div>

      {/* Thumbnails Grid */}
      <div className="grid grid-cols-4 gap-4 md:gap-8 mt-8 max-w-3xl mx-auto">
        {dummyTrailers.map((trailer) => (
          <div
            key={trailer.videoId}
            className="relative cursor-pointer hover:opacity-75 hover:-translate-y-1 duration-300 transition max-md:h-60 md:max-h-60"
            onClick={() => setCurrentTrailer(trailer)}
          >
            <img
              src={trailer.image}
              alt={trailer.title}
              className="rounded-lg w-full h-full object-cover brightness-75"
            />
            <PlayCircleIcon
              strokeWidth={1.6}
              className="absolute top-1/2 left-1/2 w-8 h-8 md:w-12 md:h-12 transform -translate-x-1/2 -translate-y-1/2 text-white"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrailerSection;
