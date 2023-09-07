"use client";

import { API_PATH, API_URL } from "@/const/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersection } from "@mantine/hooks";
import axios from "axios";
import { useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { ExploreEpisode } from "@/types/shows";
import ExploreEpisodeItem from "./ExploreEpisodeItem";

interface ExploreFeedProps {
  initData: ExploreEpisode[];
  apiPath: string;
}

const ExploreFeed: React.FC<ExploreFeedProps> = ({ initData, apiPath }) => {
  const lastEpisodeRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastEpisodeRef.current,
    threshold: 1,
  });

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [`${apiPath} query`],
    queryFn: async ({ pageParam = 12 }) => {
      const { data } = await axios.get(`${apiPath}&offset=${pageParam}
        `);

      return data.results as ExploreEpisode[];
    },
    getNextPageParam: (_, pages) => {
      return 12 * pages.length;
    },
    initialData: { pages: [initData], pageParams: [0] },
    onError: (err: any) => {
      return toast.error("Something went wrong. Try again later.");
    },
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  const allData: ExploreEpisode[] =
    data?.pages.flatMap((page) => page) ?? initData;

  return (
    <ul className="grid place-items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {allData.map((episode, index) => {
        if (index === allData.length - 1) {
          return (
            <li ref={ref} key={index}>
              <ExploreEpisodeItem data={episode} />
            </li>
          );
        } else {
          return (
            <li key={index}>
              <ExploreEpisodeItem data={episode} />
            </li>
          );
        }
      })}
    </ul>
  );
};

export default ExploreFeed;
