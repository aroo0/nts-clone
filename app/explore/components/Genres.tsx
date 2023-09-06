import { Genre } from "@/types/shows";
import GenreItem from "./GenreItem";
import { ExtendedGenre, searchQueryInterface } from "../types";



interface GenresProps {
  genreList: ExtendedGenre[];
  searchQuery: searchQueryInterface;
  setSearchQuery: (value: searchQueryInterface) => void;
}

const Genres: React.FC<GenresProps> = ({
  genreList,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <ul className="flex flex-col 	items-start">
      {genreList.map((genre) => (
        <li key={genre.id}>
          <GenreItem
            genre={genre}
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
          />
        </li>
      ))}
    </ul>
  );
};

export default Genres;
