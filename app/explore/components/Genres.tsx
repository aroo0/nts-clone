import { Genre } from "@/types/shows";

interface GenresProps {
  genreList: Genre[];
}

const Genres: React.FC<GenresProps> = ({ genreList }) => {
  return <div>Genres</div>;
};

export default Genres;
