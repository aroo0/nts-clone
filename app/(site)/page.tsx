import { API_PATH, API_URL } from "@/const/api";
import { Episode } from "@/types/shows";
import axios from "axios";
import { notFound } from "next/navigation";
import LandingPageCarousel from "./components/LandingPageCarousel";
import { MixtapeList } from "@/types/mixtapes";
import LandingPageMixtapeList from "./components/LandingPageMixtapeList";

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

  const mixtapeList = await getMixtapes();

  const ntsPicks = await getInitNtsPicks();

  if (!ntsPicks || !mixtapeList) {
    return notFound();
  }

  return (
    <div className="">
      <div className="h-[calc(100vh-79px)] w-[80%] bg-red-400">
        <LandingPageCarousel initData={ntsPicks} />
      </div>
      <div className="h-[calc(100vh-79px)] w-[600px]">
        <LandingPageMixtapeList mixtapeList={mixtapeList} />
      </div>
    </div>
  );
}
