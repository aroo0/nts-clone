"use client"
import { API_PATH, API_URL } from "@/const/api";
import { MixtapeList } from "@/types/mixtapes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

const getMixtapes = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["station-query"],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/${API_PATH.MIXTAPES}`);
      return data as MixtapeList;
    },
    onError: (err: any) => {
      return toast.error("Something went wrong. Try again later.");
    },
  });


  return {data, isLoading};
}


export default getMixtapes