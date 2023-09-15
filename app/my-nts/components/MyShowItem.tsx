import RemoveButton from "@/app/my-nts/components/RemoveButton";
import CopyLinkAction from "@/components/CopyLinkAction";
import Image from "next/image";
import Link from "next/link";

interface MyShowItemProps {
  showData: ShowLikeWithShow;
}

const MyShowItem: React.FC<MyShowItemProps> = ({ showData }) => {
  return (
    <div className="flex gap-4 px-2">
      <Link
        href={`/shows/${showData.show_alias}`}
        className="ml-auto hidden h-[100px] w-[180px] transition hover:opacity-80 lg:block"
      >
        <Image
          src={showData.shows.img!}
          width={200}
          height={200}
          alt={showData.shows.name}
          className="h-full w-full object-cover "
        />
      </Link>
      <div className="mb-1 flex flex-1 justify-between">
        <Link href={`/shows/${showData.show_alias}`}>
          <h2 className="font-extrabold uppercase transition hover:opacity-80">
            {showData.shows.name}
          </h2>
        </Link>
        <div className="ml-auto flex gap-4 self-end">
          <RemoveButton alias={showData.show_alias} variant="HOST" />
          <CopyLinkAction classToSent="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default MyShowItem;
