"use client";
import { Episode, ExploreEpisode, Genre, Mood } from "@/types/shows";
import Moods from "./Moods";
import SelectedFilters from "./SelectedFilters";
import Results from "./Results";
import Genres from "./Genres";
import ExploreButton from "./ExploreButton";
import { useEffect, useState } from "react";
import { drawerTypes, searchQueryInterface } from "../types";
import { useRouter } from "next/navigation";
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
  const [searchQuery, setSearchQuery] = useState<searchQueryInterface>({
    mood: null,
    genres: {},
  });
  const router = useRouter();
  const [queryString, setQueryString] = useState<string>("");

  const redirectUrl = () => {
    const query = {
      moods: [searchQuery.mood?.id],
      genres: Object.values(searchQuery.genres).map((genre) => genre.id),
    };
    setQueryString(qs.stringify(query, { arrayFormat: "bracket" }));

    const url = qs.stringifyUrl(
      { url: "/explore", query: query },
      { arrayFormat: "bracket" },
    );
    router.push(url);
  };

  useEffect(() => {
    redirectUrl();
  }, [searchQuery, router, queryString]);

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
      />

      {selectedDrawer === "Moods" && (
        <Moods
          moodList={moodList}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
          redirectUrl={redirectUrl}
          setSelectedDrawer={setSelectedDrawer}
        />
      )}
      {selectedDrawer === "Genres" && (
        <Genres
          genreList={genreList}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
          setSelectedDrawer={setSelectedDrawer}
        />
      )}
      {selectedDrawer === "Results" && <Results queryString={queryString} />}
    </div>
  );
};

export default ExploreSection;
