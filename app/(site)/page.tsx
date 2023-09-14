import { API_PATH, API_URL } from "@/const/api";
import useLogo from "@/hooks/useLogo";
import { Episode } from "@/types/shows";
import axios from "axios";
import Image from "next/image";
import { notFound } from "next/navigation";
import SliderEpisodeItem from "./components/SliderEpisodeItem";
import LandingPageCarousel from "./components/LandingPageCarousel";

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

  const initData = await getInitNtsPicks();

  if (!initData) {
    return notFound();
  }


  return (
    <div className="">
      <div className="h-[calc(100vh-79px)] w-[80%] bg-red-400">
        <LandingPageCarousel initData={initData} />


      </div>
    </div>
  );
}
