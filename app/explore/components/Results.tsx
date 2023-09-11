"use client";

import { API_URL } from "@/const/api";
import { ExploreColection } from "@/types/shows";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ExploreEpisodeItem from "./ExploreEpisodeItem";
import ExploreFeed from "./ExploreFeed";
import { searchQueryInterface } from "../types";
import queryString from "query-string";

export const revalidate = 0;

interface ResultsProps {
  searchQuery: searchQueryInterface;
}

const Results: React.FC<ResultsProps> = ({ searchQuery }) => {
  const [initData, setInitData] = useState<ExploreColection | undefined>(
    undefined,
  );
  const [isLoading, setLoading] = useState(false);

  const query = {
    moods: [searchQuery.moods],
    genres: searchQuery.genres,
  };

  const url = queryString.stringifyUrl(
    { url: `${API_URL}/search/episodes?`, query: query },
    { arrayFormat: "bracket" },
  );

  useEffect(() => {
    const fetchInitData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(url);
        setInitData(data as ExploreColection);
      } catch (error: any) {
        return toast.error("Something went wrong. Try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchInitData();
  }, [searchQuery]);

  if (isLoading) {
    return (
      <ul className="grid place-items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {Array.from({ length: 12 }, (episode, index) => (
          <div
            key={index}
            className="duration-[3s] flex h-full animate-pulse flex-col border  border-neutral-800 p-2"
          >
            <div className=" cursor-pointe pulse relative h-[200px] w-full bg-neutral-900"></div>
            <div className="mt-1 p-2 ">
              <div className="flex items-center  justify-between">
                <span className="h-4 w-16 bg-neutral-900 "></span>
                <span className="h-4 w-20 bg-neutral-900 "></span>
              </div>
              <div className="mt-2 h-6 w-40 bg-neutral-900 " />
            </div>
            <div className="mt-auto flex flex-wrap gap-2 p-2">
              {Array.from({ length: 3 }, (tag, indexInner) => (
                <div
                  key={index + indexInner}
                  className="h-6 w-16 border border-neutral-800 px-2 py-1.5 text-xs font-extrabold uppercase text-neutral-300 transition hover:bg-neutral-700"
                />
              ))}
            </div>
          </div>
        ))}
      </ul>
    );
  }

  if (query.moods.length === 0 && query.genres.length === 0) {
    return (
      <div className="mt-10 flex flex-col items-center gap-3">
        <h2 className="font-extrabold uppercase">
          {query.moods} 
          SELECT FILTERS TO EXPLORE THE ARCHIVE.
        </h2>
      </div>
    );
  }

  if (!initData || initData?.results.length === 0) {
    return (
      <div className="mt-10 flex flex-col items-center gap-3">
        <h2 className="font-extrabold uppercase">
          WE COULD NOT FIND ANY RESULTS
        </h2>

        <p className="text-sm">Try searching for something else</p>
      </div>
    );
  }

  return (
    <div>
      <ExploreFeed initData={initData.results} apiPath={url} />
    </div>
  );
};

export default Results;
