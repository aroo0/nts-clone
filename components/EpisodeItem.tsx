"use client";

import { useDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { PhPlayFill } from "./Icons";
import { Episode } from "@/types/shows";

interface EpisodeItemProps {
  data: Episode;
}

const EpisodeItem: React.FC<EpisodeItemProps> = ({ data }) => {
  return (
    <div className="flex h-full flex-col border border-neutral-600 p-2 ">
      <div className="group relative h-[200px] w-full cursor-pointer ">
        <Image
          src={data.media.picture_medium}
          alt={data.name}
          height={400}
          width={400}
          className="h-full w-full max-w-full object-cover"
        />
        <div className="absolute top-0 flex h-full w-full items-end transition lg:items-center lg:justify-center lg:bg-black/50  lg:opacity-0 lg:group-hover:opacity-100 ">
          <div className="bg-white px-5 py-2 lg:bg-transparent">
            <PhPlayFill className="h-9 w-9 text-black lg:h-12 lg:w-12 lg:text-white" />
          </div>
        </div>
      </div>
      <Link
        href={`/shows/${data.show_alias}/episodes/${data.episode_alias}`}
        className="mt-1 p-2 transition hover:bg-white hover:text-black"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs">{useDate(data.updated)}</span>
          <span className="text-xs uppercase">{data.location_long}</span>
        </div>
        <h2 className="mt-1 text-lg font-extrabold uppercase">{data.name}</h2>
      </Link>
      <div className="mt-auto flex flex-wrap gap-2 p-2">
        {data.genres.map((tag, index) => (
          <Link key={index} href={`/explore/genre/${tag.id}`}>
            <button className="border border-neutral-700 px-2 py-1.5 text-xs font-extrabold uppercase text-neutral-300 transition hover:bg-neutral-700">
              {tag.value}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EpisodeItem;
