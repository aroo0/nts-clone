import Image from "next/image";
import Link from "next/link";
import { ExploreEpisode } from "@/types/shows";
import PlayPauseExploreEpisodeToggle from "./PlayPauseExploreEpisodeItem";

interface ExploreEpisodeItemProps {
  data: ExploreEpisode;
}

const ExploreEpisodeItem: React.FC<ExploreEpisodeItemProps> = ({ data }) => {
  return (
    <div className="flex h-full flex-col border border-neutral-600 p-2 ">
      <div className="group relative h-[200px] w-full cursor-pointer ">
        <Image
          src={data.image!.medium}
          alt={data.title}
          height={400}
          width={400}
          className="h-full w-full max-w-full object-cover"
        />
        <PlayPauseExploreEpisodeToggle data={data} />
      </div>
      <Link
        href={data.article.path}
        className="mt-1 p-2 transition hover:bg-white hover:text-black"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs">{data.local_date}</span>
          <span className="text-xs uppercase">{data.location}</span>
        </div>
        <h2 className="mt-1 font-extrabold	 uppercase leading-tight">
          {data.title}
        </h2>
      </Link>
      <div className="mt-auto flex flex-wrap gap-2 p-2">
        {data.genres!.map((tag, index) => (
          <Link key={index} href={`/explore?genres=${tag.id}`}>
            <button className="border border-neutral-700 px-2 py-1.5 text-xs font-extrabold uppercase text-neutral-300 transition hover:bg-neutral-700">
              {tag.name}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ExploreEpisodeItem;
