"use client";
import usePlayer from "@/stores/usePlayer";
import { MaterialSymbolsShare, PhPlayFill, PhXBold } from "./Icons";
import { twMerge } from "tailwind-merge";
import useRadioToggle from "@/hooks/useRadioToggle";
import Image from "next/image";
import SaveEpisodeAction from "./SaveEpisodeAction";
import FavoriteShowAction from "./FavoriteShowAction";
import Link from "next/link";
import CopyLinkAction from "./CopyLinkAction";

const EpisodeRadio = () => {
  const { activePlayer } = usePlayer();
  const { stopRadio } = useRadioToggle();

  return (
    <div
      className={twMerge(
        "border-t-1 lg:border-r-1 fixed bottom-0 z-[100] flex h-[61px] w-full translate-y-0 items-center gap-4 border-neutral-700 bg-white text-black transition lg:w-[900px] ",
        activePlayer.type !== "episode" &&
          "translate-y-[61px] transition duration-100 ",
      )}
    >
      {activePlayer.type === "episode" && (
        <>
          <div className="h-[60px] w-[60px]">
            <Image
              src={activePlayer.info?.image!}
              alt={activePlayer.info?.name!}
              width={200}
              height={200}
              className=" h-full w-full object-cover"
            />
          </div>
          <Link
            href={activePlayer.info?.source![0].url!}
            className="flex h-[60px] w-[30px] items-center justify-center"
          >
            <PhPlayFill className="h-[25px] w-[25px] " />
          </Link>

          <Link
            href={activePlayer.info?.source![0].url!}
            className="flex h-[60px] flex-1 flex-col justify-center"
          >
            <span className="line-clamp-1 text-sm  font-extrabold uppercase leading-4">
              {activePlayer.info?.name}
            </span>
            <span className="line-clamp-1 text-xs">Play on Soundcloud. Soundcloud API is not longer widely open. {";{"}</span>
          </Link>
          <Link href="https://soundcloud.com" target="_blank">
            <Image
              src="/images/soundcloud-brand-logo.png"
              alt="Soundcloud"
              height={43}
              width={64}
              className="w-[32px] md:mx-4"
            />
          </Link>
          <div className=" hidden items-center gap-4 text-black md:flex">
            <SaveEpisodeAction
              classToSent="h-6 w-6"
              data={{
                alias: activePlayer.stationName!,
                img: activePlayer.info?.image!,
                name: activePlayer.info?.name!,
                date: activePlayer.info?.date!,
                showAlias: activePlayer.info?.showData?.showAlias!,
              }}
            />
            <FavoriteShowAction classToSent="h-6 w-6"
                data={{
                  alias: activePlayer.info?.showData?.showAlias!,
                  name: activePlayer.info?.showData?.showName!,
                  img: activePlayer.info?.showData?.showImage!,
                }}/>
            <CopyLinkAction classToSent="h-5 w-5" />
          </div>
          <Link
            className="mx-2 hidden text-xs font-extrabold uppercase md:block "
            href={activePlayer.info?.tracklist!}
          >
            Tracklist
          </Link>

          <button
            className="flex h-[40px] w-[40px] items-center justify-center border-neutral-300 sm:h-[60px] sm:w-[60px] sm:border-l"
            onClick={() => stopRadio()}
          >
            <PhXBold className="h-5 w-4 md:h-[23px] md:w-[23px]" />
          </button>
        </>
      )}
    </div>
  );
};

export default EpisodeRadio;
