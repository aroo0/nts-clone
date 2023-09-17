
const EpisodeItemSkleleton = () => {
  return (
    <div className="duration-[3s] flex h-full animate-pulse flex-col border  border-neutral-800 p-2 ">
      <div className=" pulse relative h-[200px] w-full bg-neutral-800"></div>
      <div className="mt-1 p-2 ">
        <div className="flex items-center justify-between">
          <span className="h-4 w-16 bg-neutral-800 "></span>
          <span className="h-4 w-20 bg-neutral-800 "></span>
        </div>
        <div className="mt-2 h-6 w-40 bg-neutral-800 " />
      </div>
      <div className="mt-auto flex flex-wrap gap-2 p-2">
        {Array.from({ length: 3 }, (tag, indexInner) => (
          <div
            key={indexInner}
            className="h-6 w-16 border border-neutral-800 px-2 py-1.5  text-neutral-300  bg-neutral-800"
          />
        ))}
      </div>
    </div>
  );
};

export default EpisodeItemSkleleton;
