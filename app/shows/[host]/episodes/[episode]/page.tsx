import { PhPlayFill } from "@/components/Icons";
import UserActions from "@/components/UserActions";
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
    <div className="lg:relative lg:pt-[78px] lg:min-h-full w-full">
      <div className="lg:fixed top-[78px] h-full w-full ">
        <Image
          src={data.media.background_large}
          width={1600}
          height={900}
          alt={data.name}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="lg:absolute top-1/2 z-[20] w-full lg:w-[40%]">
        <div className="flex w-full flex-col gap-3 bg-white px-9 py-7 text-black ">
          <div className="flex gap-4 border-b border-black pb-4">
            <PhPlayFill className=" h-10 w-10" />
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
              <Link key={index} href={`/explore/genre/${tag.id}`}>
                <button className="border border-neutral-700 px-1.5 py-1 text-xs font-extrabold uppercase transition hover:bg-neutral-700 hover:text-white">
                  {tag.value}
                </button>
              </Link>
            ))}
          </div>
          <div className="mt-4 flex items-center  justify-between">
            <UserActions />
            <Link
              href={`/shows/${host}`}
              className="font-extrabold uppercase text-neutral-700 hover:text-neutral-400"
            >
              Find More
            </Link>
          </div>
        </div>
        <div className="bg-black px-9 py-7 min-h-[160px] text-white">
          {data.embeds.tracklist.metadata.resultset.count > 0 ? (
            <>
              <div className="text-lg font-extrabold uppercase">Tracklist</div>
              <ul className="grid gap-5 mt-10">
                {data.embeds.tracklist.results.map((track) => (
                  <li className="" key={track.uid}>
                    <p className="uppercase font-extrabold">{track.artist}</p>
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
