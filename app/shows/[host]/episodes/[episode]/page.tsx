import CopyLinkAction from "@/components/CopyLinkAction";
import FavoriteShowAction from "@/components/FavoriteShowAction";
import { PhPlayFill } from "@/components/Icons";
import PlayPauseEpisodePage from "@/components/PlayPauseEpisodePage";
import SaveEpisodeAction from "@/components/SaveEpisodeAction";
import { API_PATH, API_URL } from "@/const/api";
import { useDate } from "@/lib/utils";
import { Episode } from "@/types/shows";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface EpisodeProps {
  params: {
    host: string;
    episode: string;
  };
}

const Episode: React.FC<EpisodeProps> = async ({
  params: { host, episode },
}) => {
  const getEpisodeData = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/${API_PATH.SHOWS}/${host}/episodes/${episode}`,
      );
      return data as Episode;
    } catch (error) {
      console.log(error);
    }
  };

  const data = await getEpisodeData();

  if (!data) return notFound();

  return (
    <div className="w-full lg:relative lg:min-h-full lg:pt-[78px]">
      <div className="top-[78px] h-full w-full lg:fixed ">
        <Image
          src={data.media.background_large}
          width={1600}
          height={900}
          alt={data.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="top-1/2 z-[20] w-full lg:absolute lg:w-[40%]">
        <div className="flex w-full flex-col gap-3 bg-white px-9 py-7 text-black ">
          <div className="flex gap-4 border-b border-black pb-4">
            <PlayPauseEpisodePage data={data} />

            <div className="flex flex-col gap-2 p-1 uppercase">
              <h1 className="text-2xl font-extrabold">{data.name}</h1>
              <span>
                {data.location_long}
                {", "}
                {useDate(data.updated)}
              </span>
            </div>
          </div>
          <p className="text-sm">{data.description}</p>
          <div className="mt-auto flex flex-wrap gap-2">
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
          <div className="mt-4 flex items-center  justify-between">
            <div className=" hidden items-center gap-4 text-black md:flex">
              <SaveEpisodeAction classToSent="h-7 w-7" />
              <FavoriteShowAction classToSent="h-7 w-7" />
              <CopyLinkAction classToSent="h-6 w-6" />
            </div>
            <Link
              href={`/shows/${host}`}
              className="font-extrabold uppercase text-neutral-700 hover:text-neutral-400"
            >
              Find More
            </Link>
          </div>
        </div>
        <div className="min-h-[160px] bg-black px-9 py-7 text-white">
          {data.embeds.tracklist.metadata.resultset.count > 0 ? (
            <>
              <div className="text-lg font-extrabold uppercase">Tracklist</div>
              <ul className="mt-10 grid gap-5">
                {data.embeds.tracklist.results.map((track) => (
                  <li className="" key={track.uid}>
                    <p className="font-extrabold uppercase">{track.artist}</p>
                    <p className="text-sm">{track.title}</p>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="text-base font-extrabold uppercase">
              No tracklist provided
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Episode;
