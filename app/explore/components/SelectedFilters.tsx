import { MaterialSymbolsClose } from "@/components/Icons";
import { ExtendedGenre, ExtendedMood, searchQueryInterface } from "../types";
import { genreList } from "@/const/genres";

interface SelectedFiltersProps {
  searchQuery: searchQueryInterface;
  setSearchQuery: (value: searchQueryInterface) => void;
  moodsParam: string | undefined;
}

const SelectedFilters: React.FC<SelectedFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  moodsParam,
}) => {
  const flattenTags = searchQuery.moods
    ? [searchQuery.moods, ...searchQuery.genres]
    : searchQuery.genres;

  const handleRemoveFromSearchQuery = (tag: string) => {
    if (tag === moodsParam) {
      setSearchQuery({ ...searchQuery, moods: undefined });
    } else {
      const updatedGenres = searchQuery.genres.filter((genre) => genre !== tag);

      setSearchQuery({
        ...searchQuery,
        genres: updatedGenres,
      });
    }
  };

  if (flattenTags.length === 0) {
    return (
      <div className="bg-neutral-900 px-4 py-6">
        <p className="text-xs text-neutral-300">
          Select a mood, or multiple genres
        </p>
      </div>
    );
  }

  return (
    <div className="bg-neutral-900 px-4 py-6">
      <ul className="flex gap-2">
        {flattenTags.map((tag) => (
          <li key={tag}>
            <button
              className=" flex items-center  gap-2 border border-neutral-700 px-2 py-1 text-xs font-extrabold uppercase text-neutral-300 hover:bg-neutral-700"
              onClick={() => handleRemoveFromSearchQuery(tag)}
            >
              <span>{genreList[tag]}</span>
              <MaterialSymbolsClose className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectedFilters;
