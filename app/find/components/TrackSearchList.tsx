import { PhCaretRightBold } from "@/components/Icons";
import { ExploreEpisode } from "@/types/shows";
import Link from "next/link";

interface TrackSearchListProps {
  data: ExploreEpisode[];
}

const TrackSearchList: React.FC<TrackSearchListProps> = ({ data }) => {
  return (
    <ul className="grid gap-4">
      {data.map((entry, index) => (
        <li className="grid gap-2 border-b border-neutral-500 pb-4" key={index}>
          <div className="flex flex-col sm:flex-row sm:gap-2">
            <span className="font-extrabold uppercase ">
              {entry.artists[0].name}
            </span>
            <span className="text-neutral-300 hidden sm:block">{" • "}</span>
            <span>{entry.title}</span>
          </div>
          <Link href={entry.article.path} className="group flex lg:gap-2 flex-col lg:flex-row text-sm pl-4 sm:pl-0 ">
            <span className="text-neutral-300">Track played on</span>
            <span className="flex flex-1 justify-between font-extrabold uppercase group-hover:text-neutral-500  ">
              <span className="line-clamp-1 pr-5">{entry.article.title}</span>
              <span className="flex items-center gap-1">
                <span className="hidden flex-nowrap whitespace-nowrap text-xs lg:block	">
                  Listen black
                </span>
                <PhCaretRightBold className="h-3 w-3" />
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default TrackSearchList;
