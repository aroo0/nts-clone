"use client";
import { Genre, Mood } from "@/types/shows";
import Moods from "./Moods";
import SelectedFilters from "./SelectedFilters";
import Results from "./Results";
import Genres from "./Genres";
import ExploreButton from "./ExploreButton";
import { useState } from "react";
import { drawerTypes, searchQueryInterface } from "../types";

interface ExploreSectionProps {
  moodList: Mood[];
  genreList: Genre[];
  
}

const ExploreSection: React.FC<ExploreSectionProps> = ({
  moodList,
  genreList,
}) => {
  const [selectedDrawer, setSelectedDrawer] = useState<drawerTypes>("Moods");
  const [searchQuery, setSearchQuery] = useState<searchQueryInterface>({
    mood: null,
    genres: {},
  });
  return (
    <div className="mt-6 grid gap-6">
      <div className="text-extrabold flex gap-4">
        <ExploreButton
          name="Moods"
          selectedDrawer={selectedDrawer}
          setSelectedDrawer={setSelectedDrawer}
        />
        <ExploreButton
          name="Genres"
          selectedDrawer={selectedDrawer}
          setSelectedDrawer={setSelectedDrawer}
        />
      </div>
      <SelectedFilters searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>

      {selectedDrawer === "Moods" && (
        <Moods
          moodList={moodList}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
        />
      )}
      {selectedDrawer === "Genres" && (
        <Genres
          genreList={genreList}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
        />
      )}
      {selectedDrawer === "Results" && <Results />}
    </div>
  );
};

export default ExploreSection;
