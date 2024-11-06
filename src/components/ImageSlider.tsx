// import * as React from "react";
// import Image from "next/image";
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

// export interface Artwork {
//   artist: string;
//   art: string;
// }

// export const works: Artwork[] = [
//   {
//     artist: "Ornella Binni",
//     art: "ksa",
//   },
//   {
//     artist: "Tom Byrom",
//     art: "sdjijd",
//   },
//   {
//     artist: "Vladimir Malyavko",
//     art: "adjiaj",
//   },
// ];

// const ScrollAreaHorizontalDemo = () => {
//   return (
//     <ScrollArea className="w-full max-w-8xl h-[50vh] overflow-x-auto">
//       <div className="flex w-max space-x-4 p-4">
//         {works.map((artwork) => (
//           <figure key={artwork.artist} className="shrink-0">
//             <div className="overflow-hidden w-[40vh] h-[40vh] justify-center flex items-center bg-red-400 rounded-md">
//               {/* <Image
//                 src={artwork.art}
//                 alt={`Photo by ${artwork.artist}`}
//                 className="aspect-[3/4] object-cover"
//                 width={300}
//                 height={400}
//               /> */}Saad
//             </div>
//             {/* <figcaption className="pt-2 text-xs text-muted-foreground">
//               Photo by{" "}
//               <span className="font-semibold text-foreground">
//                 {artwork.artist}
//               </span>
//             </figcaption> */}
//           </figure>
//         ))}
//       </div>
//       <ScrollBar orientation="horizontal" />
//     </ScrollArea>
//   );
// };

// export default ScrollAreaHorizontalDemo;

"use client";
import * as React from "react";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useState, useEffect } from "react";
export interface Artwork {
  artist: string;
  art: string;
}
export const works: Artwork[] = [
  {
    artist: "Ornella Binni",
    art: "eventa1.jpg",
  },
  {
    artist: "Tom Byrom",
    art: "eventa2.jpg",
  },
  {
    artist: "Vladimir Malyavko",
    art: "eventa1.jpg",
  },
  {
    artist: "Ornella Binni",
    art: "eventa2.jpg",
  },
  {
    artist: "Tom Byrom",
    art: "eventa1.jpg",
  },
  {
    artist: "Vladimir Malyavko",
    art: "eventa2.jpg",
  },
];
const ScrollAreaHorizontalDemo = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % works.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <p className="text-3xl md:text-3xl lg:text-4xl text-center text-wrap max-w-2xl text-whiteleading-relaxed mb-4">
          Welcome to{" "}
          <span className="text-indigo-400 font-semibold">Eventify</span>
        </p>
      </div>
      <h1 className="sm:text-3xl max-sm:flex max-sm:flex-col text-4xl  text-wrap md:text-4xl lg:text-5xl font-bold mb-6 text-white tracking-wide">
        Discover & Join{" "}
        <span className="max-sm:text-3xl">Thrilling Events</span>
      </h1>
      <ScrollArea className="w-full xl:max-w-7xl lg:max-w-5xl md:max-w-3xl sm:max-w-2xl max-sm:max-w-sm h-[60vh] bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-lg overflow-x-auto p-4">
        <div className="flex w-max  ">
          <figure
            key={works[currentIndex].artist}
            className="shrink-0 relative"
          >
            <div className="flex items-center justify-center w-[100vh] ] h-[50vh] md:h-[60vh]  bg-gray-700 rounded-lg shadow-md  transition-transform duration-300 ease-in-out overflow-hidden">
              <Image
                src={`/${works[currentIndex].art}`}
                alt={`Photo by ${works[currentIndex].artist}`}
                className="object-cover opacity-40"
                layout="fill"
                priority
              />
            </div>
          </figure>
        </div>
        <ScrollBar
          orientation="horizontal"
          className="bg-gray-700 rounded-full mt-4"
        />
      </ScrollArea>
      {/* <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white z-10 text-wrap"> */}
      <div className="flex justify-center items-center flex-col flex-wrap">
        <div className="flex flex-col justify-center items-center">
          <p className="sm:text-xl md:text-xl lg:text-2xl text-center text-wrap max-w-2xl text-whiteleading-relaxed ">
            Stay updated on the latest events
            {/* </p>
          <p className=" sm:text-xl md:text-2xl lg:text-3xl text-center text-wrap max-w-2xl text-whiteleading-relaxed "> */}
            happening around our college and
            {/* </p>
          <p className="sm:text-xl md:text-2xl lg:text-3xl text-center text-wrap max-w-2xl text-whiteleading-relaxed "> */}{" "}
            find your next unforgettable experience.
          </p>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};
export default ScrollAreaHorizontalDemo;
