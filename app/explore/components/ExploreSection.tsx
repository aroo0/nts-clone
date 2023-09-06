"use client";
import { Genre, Mood } from "@/types/shows";
import Moods from "./Moods";
import SelectedFilters from "./SelectedFilters";
import Results from "./Results";
import Genres from "./Genres";
import ExploreButton from "./ExploreButton";
import { useState } from "react";

interface ExploreSectionProps {
  moodList: Mood[];
  genreList: Genre[];
}
export type drawerTypes = "Moods" | "Genres" | "Results";

const ExploreSection: React.FC<ExploreSectionProps> = ({
  moodList,
  genreList,
}) => {
  const [selectedDrawer, setSelectedDrawer] = useState<drawerTypes>("Moods");

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
      <SelectedFilters />

      {selectedDrawer === "Moods" && <Moods moodList={moodList} />}
      {selectedDrawer === "Genres" && <Genres genreList={genreList} />}
      {selectedDrawer === "Results" && <Results />}
    </div>
  );
};

export default ExploreSection;
