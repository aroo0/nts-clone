import EpisodesFeed from "@/components/EpisodesFeed";
import { API_PATH, API_URL } from "@/const/api";
import { Episode } from "@/types/shows";
import axios from "axios";
import { notFound } from "next/navigation";

const NtsPicks = async () => {
  const apiPath = `${API_URL}/${API_PATH.NTS_PICKS}`;

  const getInitNtsPicks = async () => {
    try {
      const { data } = await axios.get(apiPath);
      return data.results as Episode[];
    } catch (error) {
      console.log(error);
    }
  };

  const data = await getInitNtsPicks();

  if (!data) return notFound();

  return (
    <div className="mx-6 pb-20 pt-12 ">
      <div className="my-3 flex flex-col gap-2 lg:mb-16 lg:mt-3">
        <h1 className="text-2xl font-extrabold uppercase">NTS Picks</h1>
        <p className="text-sm ">Recent radio highlights hand picked by NTS.</p>
      </div>
      <EpisodesFeed initData={data} apiPath={apiPath} />
    </div>
  );
};

export default NtsPicks;
