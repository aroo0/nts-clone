"use client";

import { MixtapeList } from "@/types/mixtapes";
import Link from "next/link";
import { useRef, useState } from "react";

interface MixtapeGenralItemProps {
  mixtapeList: MixtapeList
}

const MixtapeGenralItem: React.FC<MixtapeGenralItemProps> = ({mixtapeList}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleVideoMouseOver = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleVideoMouseOut = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };
  return (
    <Link href="/infinite-mixtapes" className="row-span-2">
      <div
        className=" group relative flex flex-col w-full h-full gap-2 border-l border-t border-neutral-700 p-3	py-4"
        onMouseOver={handleVideoMouseOver}
        onMouseOut={handleVideoMouseOut}
      >
        <div className="absolute  inset-0  z-[-1] m-auto h-[96%] w-[95%] opacity-60  transition group-hover:opacity-30">
          <video
            src="https://media.ntslive.co.uk/static/nts_im_heading_tile_video-374x734-30fps-ea81412f7a5d2d4734c56827fcd71610.mp4"
            loop
            ref={videoRef}
            className="h-full w-full object-cover"
            muted
          ></video>
        </div>
        <h2 className="text-xl font-extrabold uppercase ">Inifite Mixtapes</h2>
        <p className="text-[13px]">{mixtapeList.metadata.subtitle}</p>
      </div>
    </Link>
  );
};

export default MixtapeGenralItem;
