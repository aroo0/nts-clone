"use client";

import { API_PATH, API_URL } from "@/const/api";
import { MixtapeList } from "@/types/mixtapes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { toast } from "react-hot-toast";
import { IoPlaySharp, IoStopSharp } from "react-icons/io5";
import { RxCaretRight } from "react-icons/rx";

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



  return (
    <div className="pt-[49px] mx-4">
      <div className="my-3 flex flex-col gap-1 lg:mb-16 lg:mt-3 lg:items-center">
        <h1 className="text-2xl font-extrabold uppercase">Infinite Mixtapes</h1>
        <p className="text-sm ">{data?.metadata.subtitle}</p>
      </div>
      <div className="box-border grid w-full border-x border-t border-neutral-600 lg:mx-auto lg:max-w-[928px] lg:grid-cols-2 lg:border-x-transparent">
        {data?.results.map((entry) => (
          <article
            key={entry.mixtape_alias}
            className="group relative flex items-center gap-6 border-b border-neutral-600 p-2  lg:gap-0 lg:odd:border-l lg:odd:border-r lg:even:border-r"
          >
            <div
              style={{
                backgroundImage: `url(${entry.media.picture_medium})`,
              }}
              className=" absolute m-auto h-[95px] w-[95px] bg-cover bg-center bg-no-repeat opacity-50 delay-100 duration-200 ease-in group-hover:opacity-30	lg:h-[164px]	lg:w-[97%]	"
            />
            <Link className="peer w-full h-full pr-8 order-last z-[20] transition duration-400" href={`/infinite-mixtapes/${entry.mixtape_alias}`}>
              <div className="flex flex-col h-full justify-center gap-4">
                <div className="ease group flex items-center justify-between gap-3 transition duration-300 lg:translate-y-[20px] lg:justify-start lg:group-hover:translate-y-[0px]">
                  <div className="flex items-center gap-5 lg:gap-3 ">
                    <div className="relative z-0 h-6 w-6  ">
                      <Image
                        src={entry.media.icon_white}
                        alt="Mixtape icon"
                        fill
                        className=""
                      />
                    </div>
                    <h2 className="z-[3] text-base font-extrabold uppercase sm:text-lg xl:text-xl ">
                      {entry.title}
                    </h2>
                  </div>
                  <RxCaretRight
                    size={23}
                    className="ease transition-500 transition lg:opacity-0 lg:group-hover:opacity-100"
                  />
                </div>
                <p className="ease z-[3] hidden h-[20px] translate-y-[0px] text-sm opacity-0 transition delay-100 duration-300 lg:block lg:group-hover:translate-y-[-10px] lg:group-hover:opacity-100">
                  {" "}
                  {entry.subtitle}
                </p>
              </div>
            </Link>
            <button className="relative text-white z-[3] flex aspect-square h-[95px] w-[95px] items-center justify-center transition  lg:h-[160px] lg:w-[160px] lg:hover:scale-125 peer-hover:text-neutral-600 duration-400">
              <IoPlaySharp size={60} className="h-10 w-10 lg:h-14 lg:w-14" />
            </button>
          </article>
        ))}
      </div>
    </div>
  );
};

export default MixtapesList;
