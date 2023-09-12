import { useDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Episode } from "@/types/shows";
import PlayPauseToggle from "./PlayPauseEpisodeItem";

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
        <PlayPauseToggle data={data} />
      </div>
      <Link
        href={`/shows/${data.show_alias}/episodes/${data.episode_alias}`}
        className="mt-1 p-2 transition hover:bg-white hover:text-black"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs">{useDate(data.updated)}</span>
          <span className="text-xs uppercase">{data.location_long}</span>
        </div>
        <h2 className="mt-1 font-extrabold	 uppercase leading-tight">
          {data.name}
        </h2>
      </Link>
      <div className="mt-auto flex flex-wrap gap-2 p-2">
        {data.genres.map((tag, index) => (
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
