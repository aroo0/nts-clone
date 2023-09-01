"use client";

import MixtapeItem from "@/components/MixtapeItem";
import { API_PATH, API_URL } from "@/const/api";
import { MixtapeList } from "@/types/mixtapes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

const Mixtapes = () => {
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

  return (
    <div className="mx-4 pt-[49px] pb-[78px]">
      <div className="my-3 flex flex-col gap-1 lg:mb-16 lg:mt-3 lg:items-center">
        <h1 className="text-2xl font-extrabold uppercase">Infinite Mixtapes</h1>
        <p className="text-sm ">{data?.metadata.subtitle}</p>
      </div>
      <div className="box-border grid w-full border-x border-t border-neutral-600 lg:mx-auto lg:max-w-[928px] lg:grid-cols-2 lg:border-x-transparent">
        {data?.results.map((entry) => (
          <MixtapeItem data={entry} key={entry.title} />
        ))}
      </div>
    </div>
  );
};

export default Mixtapes;
