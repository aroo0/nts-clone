import { Genre } from "@/types/shows";
import GenreItem from "./GenreItem";
import { ExtendedGenre, drawerTypes, searchQueryInterface } from "../types";


interface GenresProps {
  genreList: ExtendedGenre[];
  searchQuery: searchQueryInterface;
  setSearchQuery: (value: searchQueryInterface) => void;
  setSelectedDrawer: (value: drawerTypes) => void

}

const Genres: React.FC<GenresProps> = ({
  genreList,
  searchQuery,
  setSearchQuery,
  setSelectedDrawer
}) => {
  return (
    <ul className="flex flex-col 	items-start">
      {genreList.map((genre) => (
        <li key={genre.id}>
          <GenreItem
            genre={genre}
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
            setSelectedDrawer={setSelectedDrawer}
          />
        </li>
      ))}
    </ul>
  );
};

export default Genres;
