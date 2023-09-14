import { PhPlayFill } from "@/components/Icons";
import { Episode } from "@/types/shows";
import Image from "next/image";
import Link from "next/link";

interface SliderEpisodeItemProps {
  episodeData: Episode;
}

const SliderEpisodeItem: React.FC<SliderEpisodeItemProps> = ({
  episodeData,
}) => {
  return (
    <article className="relative h-full w-full ">
      <Link
        href={`/shows/${episodeData.show_alias}/episodes/${episodeData.episode_alias}`}
      >
        <div className="absolute left-0 top-0 h-full w-full">
          <Image
            src={episodeData.media.background_large}
            width={1600}
            height={900}
            alt={episodeData.name}
            className="h-full w-full object-cover  "
          />
          <div className="absolute inset-x-0 bottom-0 h-[30%] w-full bg-gradient-to-t from-black  to-transparent opacity-80" />
        </div>
        <div className="absolute bottom-20 left-6 grid w-[360px] place-items-start gap-2	">
          <div className="aspect-square bg-white p-2 text-black">
            <PhPlayFill className="ml-[-4px] h-8 w-8" />
          </div>
          <div className="grid w-full gap-2 bg-black p-2 pb-4 pr-4 text-white">
            <div className="">
              <h3 className="line-clamp-2 text-xl font-extrabold uppercase">
                {episodeData.name}
              </h3>
              <ul className="flex  text-xs uppercase text-neutral-400">
                {episodeData.genres.slice(0, 3).map((genre) => (
                  <li
                    key={genre.id}
                    className="after:mx-1 after:content-['•'] last:after:content-['']"
                  >
                    {genre.value}
                  </li>
                ))}
              </ul>
            </div>
            <p className="line-clamp-2 text-sm">{episodeData.description}</p>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default SliderEpisodeItem;
