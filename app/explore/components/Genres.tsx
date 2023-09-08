import GenreItem from "./GenreItem";
import { ExtendedGenre, drawerTypes, searchQueryInterface } from "../types";


interface GenresProps {
  genreList: ExtendedGenre[];
  setSelectedDrawer: (value: drawerTypes) => void
  searchQuery: searchQueryInterface;
  setSearchQuery: (value: searchQueryInterface) => void;

}

const Genres: React.FC<GenresProps> = ({
  genreList,
  setSelectedDrawer,
  searchQuery,
  setSearchQuery
}) => {
  return (
    <ul className="flex flex-col items-start">
      {genreList.map((genre) => (
        <li key={genre.id}>
          <GenreItem
            genre={genre}
            setSelectedDrawer={setSelectedDrawer}
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
          />
        </li>
      ))}
    </ul>
  );
};

export default Genres;
