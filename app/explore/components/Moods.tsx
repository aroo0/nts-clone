import { PhCaretRightBold } from "@/components/Icons";
import { Mood } from "@/types/shows";
import { twMerge } from "tailwind-merge";
import { ExtendedMood, drawerTypes, searchQueryInterface } from "../types";



interface MoodsProps {
  moodList: ExtendedMood[] ;
  searchQuery: searchQueryInterface;
  setSearchQuery: (value: searchQueryInterface) => void;
  redirectUrl: () => void;
  setSelectedDrawer: (value: drawerTypes) => void

}

const Moods: React.FC<MoodsProps> = ({
  moodList,
  searchQuery,
  setSearchQuery,
  setSelectedDrawer
}) => {
  return (
    <div className="grid w-full grid-cols-2  gap-2 lg:grid-cols-4 2xl:grid-cols-6">
      {moodList.map((mood) => (
        <button
          key={mood.id}
          className={twMerge(
            "ease group relative my-auto flex  h-[30vw]  min-w-[100px] flex-col items-center justify-center gap-3 border border-neutral-600 after:absolute  after:top-0 after:h-full after:w-full after:border-2 after:border-neutral-500 after:opacity-0 after:mix-blend-plus-lighter after:transition after:content-[''] hover:after:opacity-100 lg:h-[182px]",
            mood === searchQuery.mood && "after:opacity-100",
          )}
          onClick={() => {
            mood['type'] = "Mood"
            setSearchQuery({
              ...searchQuery,
              mood: searchQuery.mood === mood ? null : mood,
            })
            setSelectedDrawer("Results")
            
          }
          }
        >
          <div
            style={{
              backgroundImage: `url(${mood.image?.medium})`,
            }}
            className="ease absolute top-0  m-auto h-[30vw] w-full bg-cover  bg-center bg-no-repeat opacity-60 delay-200 duration-300	group-hover:opacity-30 lg:h-[180px]	"
          />
          <h2 className="z-[3] mx-4 text-base font-extrabold uppercase transition delay-100 duration-200 lg:translate-y-[15px] lg:group-hover:translate-y-[-10px] ">
            {mood.name}
          </h2>
          <p className="ease z-[3] mx-4 hidden h-[20px] translate-y-[0px] text-sm opacity-0 transition delay-100 duration-300 lg:block lg:group-hover:translate-y-[-15px] lg:group-hover:opacity-100">
            {" "}
            {mood.description}
          </p>
        </button>
      ))}
    </div>
  );
};

export default Moods;
