import { API_PATH, API_URL } from "@/const/api";
import { Episode } from "@/types/shows";
import axios from "axios";
import { notFound } from "next/navigation";
import LandingPageCarousel from "./components/LandingPageCarousel";
import { MixtapeList } from "@/types/mixtapes";
import LandingPageMixtapeList from "./components/LandingPageMixtapeList";
import SliderFeed from "@/components/SliderFeed";

export default async function Home() {
  const getInitNtsPicks = async () => {
    const apiPath = `${API_URL}/${API_PATH.NTS_PICKS}`;
    try {
      const { data } = await axios.get(apiPath);
      return data.results as Episode[];
    } catch (error) {
      console.log(error);
    }
  };

  const getMixtapes = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/${API_PATH.MIXTAPES}`);
      return data as MixtapeList;
    } catch (error) {
      console.log(error);
    }
  };

  const getLatests = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/${API_PATH.LATEST}`);
      return data.results as Episode[];
    } catch (error) {
      console.log(error);
    }
  };

  const mixtapeList = await getMixtapes();

  const ntsPicks = await getInitNtsPicks();

  const latestData = await getLatests();

  if (!ntsPicks || !mixtapeList || !latestData) {
    return notFound();
  }

  return (
    <div className="pb-8">
      <div className="relative h-full w-full overflow-x-hidden border-white lg:h-[calc(100vh-80px)] lg:border-b">
        <LandingPageCarousel initData={ntsPicks} />
        <LandingPageMixtapeList mixtapeList={mixtapeList} />
      </div>
      <div className="border-b border-white">
        <div className="my-3 flex flex-col pb-4 lg:my-10 ">
          <SliderFeed
            data={latestData}
            library={{ title: "Latest", alias: "latest" }}
          />
        </div>
      </div>
    </div>
  );
}
