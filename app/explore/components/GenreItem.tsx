"use client";

import { PhCaretDownBold } from "@/components/Icons";
import { Genre } from "@/types/shows";
import * as Collapsible from "@radix-ui/react-collapsible";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { drawerTypes, searchQueryInterface } from "../types";


interface GenreItemProps {
  genre: Genre;
  searchQuery: searchQueryInterface;
  setSearchQuery: (value: searchQueryInterface) => void;
  setSelectedDrawer: (value: drawerTypes) => void

  
}

const GenreItem: React.FC<GenreItemProps> = ({
  genre,
  searchQuery,
  setSearchQuery,
  setSelectedDrawer
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAddGenreToQuery = (genre: Genre) => {
    const updatedGenres = searchQuery.genres;
    const alias = genre.id;
    if (updatedGenres[alias]) {
      delete updatedGenres[alias];
    } else {
      updatedGenres[alias] = genre;
    }

    setSearchQuery({
      ...searchQuery,
      genres: updatedGenres,
    });
    setSelectedDrawer('Results')

  };

  return (
    <Collapsible.Root open={isOpen} onOpenChange={setIsOpen} className="">
      <div className="item-center mb-2 flex  justify-start border-neutral-700 text-neutral-300 transition ">
        <button
          className={twMerge(
            "border border-neutral-700 px-3 py-1 text-xs font-extrabold uppercase hover:bg-neutral-700",
            searchQuery.genres[genre.id] && "bg-neutral-700"
          )}
          onClick={() => handleAddGenreToQuery(genre)}
        >
          {genre.name}
        </button>
        <Collapsible.Trigger className="aspect-square border-y border-r border-neutral-700 px-2.5 py-2.5 hover:text-neutral-400">
          <PhCaretDownBold
            className={twMerge(
              "h-3.5 w-3.5",
              isOpen && "rotate-180 transition",
            )}
          />
        </Collapsible.Trigger>
      </div>

      <Collapsible.Content>
        <ul className="relative mb-5 ml-4 flex max-w-[600px] flex-wrap gap-2 pl-4 before:absolute before:h-[22px] before:w-4 before:translate-x-[-20px] before:translate-y-[-8px] before:border-b before:border-l before:border-neutral-700 before:content-['']">
          {genre.subgenres?.map((subgenre) => (
            <li key={subgenre.id}>
              <button
                className={twMerge("border border-neutral-700 px-2 py-1 text-xs font-extrabold uppercase text-neutral-300 hover:bg-neutral-700", searchQuery.genres[subgenre.id] && "bg-neutral-700")}
                onClick={() => handleAddGenreToQuery(subgenre)}
              >
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
