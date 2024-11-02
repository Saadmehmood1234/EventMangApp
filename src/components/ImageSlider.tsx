import * as React from "react";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export interface Artwork {
  artist: string;
  art: string;
}

export const works: Artwork[] = [
  {
    artist: "Ornella Binni",
    art: "ksa",
  },
  {
    artist: "Tom Byrom",
    art: "sdjijd",
  },
  {
    artist: "Vladimir Malyavko",
    art: "adjiaj",
  },
];

const ScrollAreaHorizontalDemo = () => {
  return (
    <ScrollArea className="w-full max-w-8xl h-[50vh] overflow-x-auto">
      <div className="flex w-max space-x-4 p-4">
        {works.map((artwork) => (
          <figure key={artwork.artist} className="shrink-0">
            <div className="overflow-hidden w-[40vh] h-[40vh] justify-center flex items-center bg-red-400 rounded-md">
              {/* <Image
                src={artwork.art}
                alt={`Photo by ${artwork.artist}`}
                className="aspect-[3/4] object-cover"
                width={300}
                height={400}
              /> */}Saad
            </div>
            {/* <figcaption className="pt-2 text-xs text-muted-foreground">
              Photo by{" "}
              <span className="font-semibold text-foreground">
                {artwork.artist}
              </span>
            </figcaption> */}
          </figure>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default ScrollAreaHorizontalDemo;
