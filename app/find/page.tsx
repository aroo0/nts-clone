import { API_URL } from "@/const/api";
import { ExploreEpisode } from "@/types/shows";
import axios from "axios";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import EpisodeSearchList from "./components/EpisodeSearchList";
import TrackSearchList from "./components/TrackSearchList";

interface pageProps {
  searchParams: {
    q: string;
    types: string;
  };
}


const page = async ({ searchParams }: pageProps) => {
  const query = searchParams.q;
  const types = searchParams.types;

  const getData = async () => {
    if (query === "") return;

    const apiPath = `${API_URL}/search/?q=${query}&version=2&offset=0&limit=60&types[]=${types}`;
    try {
      const { data } = await axios.get(apiPath);
      return data.results as ExploreEpisode[];
    } catch (error) {
      console.log(error);
    }
  };

  const data = await getData();

  if (query === "") {
    return (
      <div className=" mx-4 mt-12">
        <div className="mx-auto grid max-w-[750px] gap-2">
          <h1 className="text-xl font-extrabold">Please enter a search term</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mt-12 pb-12">
      <div className="px-6 mx-auto grid max-w-[750px] gap-2">
        <h1 className="text-2xl font-extrabold">
          Search results for &quot;{query}&quot;
        </h1>
        <nav className="flex gap-2 border-b border-white text-xs font-extrabold uppercase text-neutral-200">
          <Link
            className={twMerge(
              "mb-[-3px] p-5",
              types === "episode" && "border-b-2 border-white",
            )}
            href={`/find?q=${query}&types=episode`}
          >
            Episodes
          </Link>
          <Link
            className={twMerge(
              "mb-[-3px]  p-5",
              types === "track" && "border-b-2 border-white",
            )}
            href={`/find?q=${query}&types=track`}
          >
            Tracks Played
          </Link>
        </nav>
        <div className="mt-8">
          {data ? (
            types === "episode" ? (
              <EpisodeSearchList data={data} />
            ) : (
              <TrackSearchList data={data} />
            )
          ) : (
            <div className="flex flex-col items-center gap-4 ">
              <h2 className="text-sm font-extrabold">
                We could not find any results{" "}
              </h2>
              <p>Check the spelling or try different keywords</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
