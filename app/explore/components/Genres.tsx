import { Genre } from "@/types/shows";
import GenreItem from "./GenreItem";

interface GenresProps {
  genreList: Genre[];
}

const Genres: React.FC<GenresProps> = ({ genreList }) => {
  return (
    <ul className="flex flex-col 	items-start">
      {genreList.map((genre) => (
        <li key={genre.id}>
          <GenreItem genre={genre} />
        </li>
      ))}
    </ul>
  );
};

export default Genres;
