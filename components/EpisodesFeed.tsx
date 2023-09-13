"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersection } from "@mantine/hooks";
import axios from "axios";
import EpisodeItem from "./EpisodeItem";
import { useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { Episode } from "@/types/shows";

interface EpisodesFeedProps {
  initData: Episode[];
  apiPath: string;
}

const EpisodesFeed: React.FC<EpisodesFeedProps> = ({ initData, apiPath }) => {
  const lastEpisodeRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastEpisodeRef.current,
    threshold: 1,
  });

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [`${apiPath} query`],
    queryFn: async ({ pageParam = 12 }) => {
      const { data } = await axios.get(`${apiPath}?offset=${pageParam}
        `);

      return data.results as Episode[];
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
      console.log("fetch");
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  const allData: Episode[] = data?.pages.flatMap((page) => page) ?? initData;

  return (
    <ul className="grid place-items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {allData.map((episode, index) => {
        if (index === allData.length - 1) {
          return (
            <li ref={ref} key={index}>
              <EpisodeItem episodeData={episode} />
            </li>
          );
        } else {
          return (
            <li key={index}>
              <EpisodeItem episodeData={episode} />
            </li>
          );
        }
      })}
    </ul>
  );
};

export default EpisodesFeed;
