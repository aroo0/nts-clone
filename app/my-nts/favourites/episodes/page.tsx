import getMyLikes from "@/actions/getMyLikes";
import MyNtsNav from "../../components/MyNtsNav";
import MyEpisodeItem from "../../components/MyEpisodeItem";

const FavoriteEpisodes = async () => {
  const favouriteEpisodes: EpisodeLikeWithEpisode[] = await getMyLikes(
    "episodeLikes",
    "Episodes",
  );

  return (
    <MyNtsNav>
      <ul className="grid gap-4">
        {favouriteEpisodes.map((episode) => (
          <li className="border-b border-neutral-500 pb-4" key={episode.id}>
            <MyEpisodeItem episodeData={episode} />
          </li>
        ))}
      </ul>
    </MyNtsNav>
  );
};

export default FavoriteEpisodes;
