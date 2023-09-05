export default function Loading() {
  return (
    <div className="pb-20 pt-8">
      <div className="mx-10 ">
        <div className="my-3 flex flex-col gap-2 border-b border-neutral-600 pb-4 lg:mt-3">
          <h1 className="text-2xl font-extrabold uppercase">Radio</h1>
          <p className="text-sm">
            Tune in live or listen back to our music archive of radio and mixes.
          </p>
        </div>
        <nav className="mb-14 hidden border-b-2 border-white pb-4 pl-4 text-xs uppercase lg:block">
          {" "}
          <ul className="flex gap-6">
            <li>
              <span>Nts Picks</span>
            </li>
            <li>
              <span>Schedule</span>
            </li>
          </ul>
        </nav>
      </div>
      <div className="mx-10 grid gap-10">
        <div
          className="h-[250px] w-full animate-pulse  bg-neutral-800
        "
        />
        <div
          className="h-[250px] w-full animate-pulse  bg-neutral-800
        "
        />
      </div>
    </div>
  );
}
