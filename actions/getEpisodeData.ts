import { API_PATH, API_URL } from "@/const/api";
import { Episode } from "@/types/shows";
import axios from "axios";

const getEpisodeData = async (host: string, episode: string) => {
  try {
    const { data } = await axios.get(
      `${API_URL}/${API_PATH.SHOWS}/${host}/episodes/${episode}`,
    );
    return data as Episode;
  } catch (error) {
    console.log(error);
  }
};


export default getEpisodeData