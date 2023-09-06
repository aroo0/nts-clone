"use client";

import { PhCaretDownBold } from "@/components/Icons";
import { Genre } from "@/types/shows";
import * as Collapsible from "@radix-ui/react-collapsible";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface GenreItemProps {
  genre: Genre;
}

const GenreItem: React.FC<GenreItemProps> = ({ genre }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible.Root open={isOpen} onOpenChange={setIsOpen} className="">
      <div className="item-center justify-start	 flex  border-neutral-700 text-neutral-300 transition mb-2 ">
        <button className="border border-neutral-700 px-3 py-1 text-xs font-extrabold uppercase hover:bg-neutral-700">
          {genre.name}
        </button>
        <Collapsible.Trigger className="aspect-square px-2.5 py-2.5 border-y border-r border-neutral-700 hover:text-neutral-400">
          <PhCaretDownBold
            className={twMerge(
              "h-3.5 w-3.5",
              isOpen && "rotate-180 transition",
            )}
          />
        </Collapsible.Trigger>
      </div>

        <Collapsible.Content>
          <ul className="relative flex flex-wrap gap-2 ml-4 max-w-[600px] mb-5 before:content-[''] before:w-4 before:h-[22px] before:border-l before:border-b before:border-neutral-700 before:translate-y-[-8px] before:translate-x-[-20px] before:absolute pl-4" >
            {genre.subgenres?.map((subgenre) => (
              <li key={subgenre.id}>
                <button className="text-neutral-300 border border-neutral-700 px-2 py-1 text-xs font-extrabold uppercase hover:bg-neutral-700">P
                  {subgenre.name}
                </button>
              </li>
            ))}
          </ul>
        </Collapsible.Content>
    </Collapsible.Root>
  );
};

export default GenreItem;
