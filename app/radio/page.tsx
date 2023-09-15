import EpisodesFeed from "@/components/EpisodesFeed";
import { PhCaretRightBold } from "@/components/Icons";
import SliderFeed from "../../components/SliderFeed";
import { API_PATH, API_URL } from "@/const/api";
import { shortGenreList } from "@/const/genres";
import { Episode } from "@/types/shows";
import axios from "axios";
import Link from "next/link";
import { notFound } from "next/navigation";

const NtsPicks = async () => {
  const getInitNtsPicks = async () => {
    const apiPath = `${API_URL}/${API_PATH.NTS_PICKS}`;
    try {
      const { data } = await axios.get(apiPath);
      return data.results as Episode[];
    } catch (error) {
      console.log(error);
    }
  };

  const getInitLatests = async () => {
    const apiPath = `${API_URL}/${API_PATH.LATEST}`;
    try {
      const { data } = await axios.get(apiPath);
      return data.results as Episode[];
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" pt-8">
      <div className="px-4 lg:mx-6 ">
        <div className="my-3 flex flex-col gap-2 border-b border-neutral-600 pb-4 lg:mt-3">
          <h1 className="text-2xl font-extrabold uppercase">Radio</h1>
          <p className="text-sm">
            Tune in live or listen back to our music archive of radio and mixes.
          </p>
        </div>
      </div>
      <div className="grid gap-10 border-b-2 border-white pb-20">
        <SliderFeed
          // @ts-ignore
          data={await getInitNtsPicks()}
          library={{
            title: "NTS Picks",
            subtitle: "Recent radio highlights hand picked by NTS.",
            alias: "nts-picks",
          }}
        />
        <SliderFeed
          // @ts-ignore
          data={await getInitLatests()}
          library={{
            title: "Latests",
            subtitle:
              "The newest additions to the NTS Radio archive, updated daily.",
            alias: "latest",
          }}
        />
      </div>
      <div className="mb-20 flex flex-col items-center justify-center gap-8 border-b-2 border-white px-4 py-10">
        <h2 className="text-2xl font-extrabold uppercase">
          DISCOVER MUSIC BY GENRE
        </h2>

        <ul className="grid grid-cols-2 items-stretch justify-stretch gap-4	lg:grid-cols-4">
          {Object.entries(shortGenreList).map(([alias, name]) => (
            <li
              className="coursor-pointer  flex border border-neutral-600  text-neutral-300  transition hover:bg-white hover:text-black "
              key={alias}
            >
              <Link
                className="flex-grow p-5 text-center text-sm font-extrabold uppercase"
                href={`/explore?genres=${alias}`}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          className="mb-0.5 flex items-center gap-1 uppercase transition hover:opacity-70 focus:opacity-70"
          href={`/explore`}
        >
          <span>More Genres</span>
          <PhCaretRightBold className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
};

export default NtsPicks;
