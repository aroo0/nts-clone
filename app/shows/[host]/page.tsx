import CopyLinkAction from "@/components/CopyLinkAction";
import EpisodesFeed from "@/components/EpisodesFeed";
import FavoriteShowAction from "@/components/FavoriteShowAction";
import { PhPlayFill } from "@/components/Icons";
import UserActions from "@/components/SaveEpisodeAction";
import { API_PATH, API_URL } from "@/const/api";
import { Show } from "@/types/shows";
import axios from "axios";
import Image from "next/image";
import { notFound } from "next/navigation";

interface EpisodeProps {
  params: {
    host: string;
  };
}

const Episode: React.FC<EpisodeProps> = async ({ params: { host } }) => {
  const apiPath = `${API_URL}/${API_PATH.SHOWS}/${host}`;
  const getEpisodeData = async () => {
    try {
      const { data } = await axios.get(apiPath);
      return data as Show;
    } catch (error) {
      console.log(error);
    }
  };

  const data = await getEpisodeData();

  if (!data) return notFound();

  return (
    <div className="relative h-full w-full">
      <div className="relative min-h-[80%] w-full">
        <div className="top-0 h-full w-full lg:absolute ">
          <Image
            src={data.media.background_large}
            width={1600}
            height={900}
            alt={data.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="bottom-0 z-[50] flex w-full lg:absolute lg:w-[40%]">
          <div className="flex w-full flex-col gap-3 bg-white px-9 py-7 text-black ">
            <div className="flex flex-col gap-2 p-1 uppercase">
              <h1 className="text-2xl font-extrabold">{data.name}</h1>
              <span className="border-b border-black pb-2">
                {data.location_long}
              </span>
              {data.frequency && (
                <span className="border-b border-black pb-2 pt-1">
                  {data.frequency}
                </span>
              )}
            </div>
            <p className="text-sm">{data.description}</p>

            <div className=" mt-4 hidden items-center gap-4 text-black md:flex">
              <FavoriteShowAction classToSent="h-7 w-7" />
              <CopyLinkAction classToSent="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-6 pb-20  pt-10">
        <h2 className="pb-10 pl-2 text-2xl font-extrabold uppercase">
          Episodes
        </h2>
        <EpisodesFeed
          initData={data.embeds.episodes.results}
          apiPath={`${apiPath}/episodes`}
        />
      </div>
    </div>
  );
};

export default Episode;
