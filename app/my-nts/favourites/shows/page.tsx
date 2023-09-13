import getMyLikes from "@/actions/getMyLikes";
import MyNtsNav from "../../components/MyNtsNav";
import MyShowItem from "../../components/MyShowItem";

const FavoriteHosts = async () => {
  const favouriteShows: ShowLikeWithShow[] = await getMyLikes(
    "showLikes",
    "Shows",
  );

  return (
    <MyNtsNav>
      <ul className="grid gap-4">
        {favouriteShows.map((show) => (
          <li className="border-b border-neutral-500 pb-4" key={show.id}>
            <MyShowItem showData={show} />
          </li>
        ))}
      </ul>
    </MyNtsNav>
  );
};

export default FavoriteHosts;
