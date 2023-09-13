import { API_PATH, API_URL } from "@/const/api";
import { Show } from "@/types/shows";
import axios from "axios";

const getShowData = async (host: string) => {
  const apiPath = `${API_URL}/${API_PATH.SHOWS}/${host}`;
  try {
    const { data } = await axios.get(apiPath);
    return data as Show;
  } catch (error) {
    console.log(error);
  }
};

export default getShowData