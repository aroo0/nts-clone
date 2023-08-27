"use client";

import { API_PATH, API_URL } from "@/const/api";
import { MixtapeList } from "@/types/mixtapes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { notFound } from "next/navigation";
import { toast } from "react-hot-toast";

const MixtapesList: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["mixtape-query"],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/${API_PATH.MIXTAPES}`);
      return data as MixtapeList;
    },
    onError: (err: any) => {
      return toast.error("Something went wrong. Try again later.");
    },
  });

  if (isLoading) return <div>Loading</div>;

  console.log(data)


  return (
    <div>
      <div className="flex items-center flex-col gap-1 mb-6">
        <h1 className="uppercase text-2xl font-extrabold">Infinite Mixtapes</h1>
        <p className="text-sm">{data?.metadata.subtitle}</p>
      </div>
      <div className="grid lg:grid-cols-2 border border-neutral-800 p-2">



      </div>
    </div>
  );
};

export default MixtapesList;
