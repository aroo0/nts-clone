"use client"
import { useDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Episode, Show } from "@/types/shows";
import PlayPauseToggle from "./PlayPauseEpisodeItem";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_PATH, API_URL } from "@/const/api";
import toast from "react-hot-toast";
import EpisodeItemSkleleton from "./skeletons/EpisodeItemSkleleton";

interface EpisodeItemProps {
  episodeData: Episode;
}

const EpisodeItem: React.FC<EpisodeItemProps> = ({ episodeData }) => {
  const { data: showData, isLoading } = useQuery({
    queryKey: [`${episodeData.show_alias}`],
    queryFn: async () => {
      const apiPath = `${API_URL}/${API_PATH.SHOWS}/${episodeData.show_alias}`;
      const { data } = await axios.get(apiPath);
      return data as Show;
    },
    onError: (err: any) => {
      return toast.error(err);
    },
  });

  const covertedDate = useDate(episodeData.updated)

  if (!showData || isLoading) {
    return <EpisodeItemSkleleton />;
  }

  return (
    <div className="flex h-full flex-col border border-neutral-600 p-2 ">
      <div className="group relative h-[200px] w-full cursor-pointer ">
        <Image
          src={episodeData.media.picture_medium}
          alt={episodeData.name}
          height={400}
          width={400}
          className="h-full w-full max-w-full object-cover"
        />
        <PlayPauseToggle
          episodeData={episodeData}
          showData={{
            showAlias: showData.show_alias,
            showName: showData.name,
            showImage: showData.media.background_medium,
          }}
        />
      </div>
      <Link
        href={`/shows/${episodeData.show_alias}/episodes/${episodeData.episode_alias}`}
        className="mt-1 p-2 transition hover:bg-white hover:text-black"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs">{covertedDate}</span>
          <span className="text-xs uppercase">{episodeData.location_long}</span>
        </div>
        <h2 className="mt-1 font-extrabold uppercase leading-tight">
          {episodeData.name}
        </h2>
      </Link>
      <div className="mt-auto flex flex-wrap gap-2 p-2">
        {episodeData.genres.map((tag, index) => (
          <Link
            key={index}
            href={`/explore?${tag.id.split("-")[0]}=${tag.id
              .split("-")
              .slice(1)
              .join("-")}`}
          >
            <button className="border border-neutral-700 px-1.5 py-1 text-xs font-extrabold uppercase transition hover:bg-neutral-700 hover:text-white">
              {tag.value}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EpisodeItem;
