import usePlayer from "@/stores/usePlayer";
import { Broadcast } from "@/types/live";
import clsx from "clsx";
import { IoPlaySharp, IoStopSharp } from "react-icons/io5";
import { twMerge } from "tailwind-merge";
import { useState, useEffect } from "react";

interface RadioStationProps {
  broadcast?: Broadcast;
  isLoading: boolean;
  stationName: string;
  mobileRadioDescOpen: boolean
}

const RadioStation: React.FC<RadioStationProps> = ({
  broadcast,
  isLoading,
  stationName,
  mobileRadioDescOpen
}) => {
  const { activePlayer, setActivePlayer, reset } = usePlayer();
  const [isPlaying, setIsPlaying] = useState(false);


  const detailsInfo = broadcast?.embeds.details
  console.log(detailsInfo);


  const toggleRadio = () => {
    if (activePlayer === stationName) {
      reset();
      setIsPlaying(false);
    } else {
      reset()
      setActivePlayer(stationName);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (activePlayer !== stationName) {
      setIsPlaying(false)
    }

  }, [activePlayer])
  
  return (
    <div
      className={twMerge(
        "flex items-center gap-1 px-1 bg-black hover:bg-neutral-700 cursor-pointer h-[33px] w-full border-white border-b lg:border-r transition-transform duration-300",
        isPlaying && "hover:bg-white bg-white",
        mobileRadioDescOpen && "absolute translate-y-[-35px]"
      )}
      onClick={toggleRadio}
    >
      <div className="lg:hidden bg-red-500 w-1.5 h-1.5 rounded-full pulse-opacity mx-1" />
      <div
        className={twMerge(
          `h-[25px] w-[25px] flex justify-center items-center text-black bg-white font-extrabold pt-0.5`,
          isPlaying && "bg-black text-white"
        )}
      >
        {stationName}
      </div>
      {isPlaying ? (
        <IoStopSharp size={15} className="text-black" />
      ) : (
        <IoPlaySharp
          size={20}
          className={isLoading && "text-neutral-500 animate-pulse"}
        />
      )}
      <div className="grid grid-cols-3 items-center truncate flex-1	">
        {isLoading ? (
          <div className="bg-neutral-500  h-3 animate-pulse w-full" />
        ) : (
          <p
            className={clsx(
              "uppercase font-extrabold text-sm truncate  col-span-3 lg:col-span-2 mr-2",
              isPlaying && "text-black"
            )}
          >
            {detailsInfo?.name}
          </p>
        )}

        {isLoading ? (
          <div className="bg-neutral-500 w-[80px] h-3 animate-pulse mr-4 hidden lg:block align-self-end" />
        ) : (
          <p
            className={clsx(
              "uppercase text-xs pr-4 font-extralight hidden lg:block justify-self-end",
              isPlaying && "text-black"
            )}
          >
            {detailsInfo?.location_long}
          </p>
        )}
      </div>
    </div>
  );
};

export default RadioStation;
