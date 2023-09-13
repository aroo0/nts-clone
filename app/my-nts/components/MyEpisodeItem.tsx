import RemoveFavHostButton from "@/app/find/components/RemoveButton";
import CopyLinkAction from "@/components/CopyLinkAction";
import Image from "next/image";
import Link from "next/link";

interface MyEpisodeItemProps {
  episodeData: EpisodeLikeWithEpisode
}

const MyEpisodeItem: React.FC<MyEpisodeItemProps> = ({ episodeData }) => {
  return (
    <div className="flex gap-4 px-2">
      <Link
        href={`/shows/${episodeData.episode_alias}`}
        className="ml-auto hidden h-[100px] w-[180px] transition hover:opacity-80 lg:block"
      >
        <Image
          src={episodeData.episodes.img!}
          width={200}
          height={100}
          alt={episodeData.episodes.name}
          className="h-full w-full object-cover "
        />
      </Link>
      <div className="mb-1 flex flex-col sm:flex-row flex-1 justify-between gap-4">
        <Link href={`/shows/${episodeData.episode_alias}`} className="flex gap-0 flex-col hover:opacity-80 transition ">
          <h2 className="font-extrabold uppercase leading-tight	">
            {episodeData.episodes.name}
          </h2>
          <span className="text-xs">{episodeData.episodes.date}</span>
        </Link>
        <div className="ml-auto flex gap-4 self-end">
          <RemoveFavHostButton  alias={episodeData.episode_alias} variant="EPISODE"  />
          <CopyLinkAction classToSent="w-4 h-4" />
          <Link href={`/shows/${episodeData.episodes.show_alias}`} className="uppercase font-extrabold  text-sm whitespace-nowrap ">Find more</Link>
        </div>
      </div>
    </div>
  );
};

export default MyEpisodeItem;
