"use client";
import { Episode, ExploreEpisode, Genre, Mood } from "@/types/shows";
import Moods from "./Moods";
import SelectedFilters from "./SelectedFilters";
import Results from "./Results";
import Genres from "./Genres";
import ExploreButton from "./ExploreButton";
import { useEffect, useState } from "react";
import { drawerTypes, searchQueryInterface } from "../types";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

interface ExploreSectionProps {
  moodList: Mood[];
  genreList: Genre[];
}

const ExploreSection: React.FC<ExploreSectionProps> = ({
  moodList,
  genreList,
}) => {
  const [selectedDrawer, setSelectedDrawer] = useState<drawerTypes>("Moods");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<searchQueryInterface>({
    moods: undefined,
    genres: [],
  });

  const moods = searchParams.get("moods") || undefined;
  const genres = searchParams.getAll("genres");



  useEffect(() => {
    if (moods || genres.length !== 0) {
      setSelectedDrawer("Results");
    }
    setSearchQuery({ moods: moods, genres: genres });
  }, [searchParams]);

  useEffect(() => {
    const query = {
      moods: searchQuery.moods,
      genres: searchQuery.genres,
    };

    const url = qs.stringifyUrl({ url: "/explore", query: query });
    router.push(url);
  }, [searchQuery]);

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
      <SelectedFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        moodsParam={moods}
      />

      {selectedDrawer === "Moods" && (
        <Moods
          moodList={moodList}
          setSelectedDrawer={setSelectedDrawer}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
        />
      )}
      {selectedDrawer === "Genres" && (
        <Genres
          genreList={genreList}
          setSelectedDrawer={setSelectedDrawer}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
        />
      )}
      {selectedDrawer === "Results" && <Results searchQuery={searchQuery} />}
    </div>
  );
};

export default ExploreSection;
