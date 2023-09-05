import { API_PATH, API_URL } from "@/const/api";
import { GenreList, Mood } from "@/types/shows";
import axios from "axios";
import { notFound } from "next/navigation";
import Moods from "./components/Moods";
import Genres from "./components/Genres";
import SelectedFilters from "./components/SelectedFilters";
import Results from "./components/Results";

const Explore = async () => {
  const getMoods = async () => {
   const apiPath = `${API_URL}/${API_PATH.MOODES}`;

    try {
      const { data } = await axios.get(apiPath);
      return data.results as Mood[];
    } catch (error) {
      console.log(error);
    }
  };

  const getGenres = async () => {
   const apiPath = `${API_URL}/${API_PATH.GENRES}`;
   try {
     const { data } = await axios.get(apiPath);
     return data.results as GenreList;
   } catch (error) {
     console.log(error);
   }
 };



  return (
    <div className="mx-6 pb-20 pt-12 ">
        <h1 className="text-2xl font-extrabold uppercase">Explore</h1>
        <div>
         <Moods moodList={await getMoods()} />
         <Genres genreList={await getGenres()}/>
        </div>
         <SelectedFilters />
         <Results />
    </div>
  );
};

export default Explore;
