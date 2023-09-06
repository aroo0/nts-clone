import { MaterialSymbolsClose } from "@/components/Icons";
import { ExtendedGenre, ExtendedMood, searchQueryInterface } from "../types";

interface SelectedFiltersProps {
  searchQuery: searchQueryInterface;
  setSearchQuery: (value: searchQueryInterface) => void;
}

const SelectedFilters: React.FC<SelectedFiltersProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  const flattenTags = [
    ...(searchQuery.mood ? [searchQuery.mood] : []),
    ...Object.values(searchQuery.genres),
  ];

  const handleRemoveFromSearchQuery = (tag: ExtendedMood | ExtendedGenre) => {
    if (tag.type === "Mood") {
      setSearchQuery({ ...searchQuery, mood: null });
    } else {
      const updatedGenres = searchQuery.genres;
      const alias = tag.id;
      delete updatedGenres[alias];

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
          <li key={tag.id}>
            <button
              className=" flex items-center  gap-2 border border-neutral-700 px-2 py-1 text-xs font-extrabold uppercase text-neutral-300 hover:bg-neutral-700"
              onClick={() => handleRemoveFromSearchQuery(tag)}
            >
              <span>{tag.name}</span>
              <MaterialSymbolsClose className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectedFilters;
