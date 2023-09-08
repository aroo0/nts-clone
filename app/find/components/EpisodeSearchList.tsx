import { ExploreEpisode } from "@/types/shows";
import Image from "next/image";
import Link from "next/link";


interface EpisodeSearchListProps {
  data: ExploreEpisode[];
}

const EpisodeSearchList: React.FC<EpisodeSearchListProps> = ({ data }) => {
  return (
    <ul className="grid gap-4">
      {data.map((entry) => (
        <li
          className="flex gap-2 border-b justify-between border-neutral-500 pb-4"
          key={entry.article.path}
        >
          <div className="grid gap-4 mr-4">
            <Link  href={entry.article.path} className="grid transition hover:text-neutral-400">
              <h2 className="font-extrabold uppercase ">{entry.title}</h2>
              <time className="text-sm">{entry.local_date}</time>
            </Link>
            <div className="text-neutral-500 text-sm"
              dangerouslySetInnerHTML={{
                __html: entry.description?.highlight_html || "",
              }}
            />
          </div>
          <Link href={entry.article.path} className="hidden lg:block w-[200px] h-[100px] ml-auto hover:opacity-80 transition">
          <Image src={entry.image!.medium}
          width={200}
          height={100}
          alt={entry.title}
          className="object-cover w-full h-full "
          />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default EpisodeSearchList;
