"use client";

import { useState } from "react";
import { TeenyiconsSearchOutline } from "./Icons";
import { useRouter } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";

const SearchBar = () => {
  const [value, setValue] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/find?q=${value}&types=episode`);
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="flex items-center gap-2 "
    >
      <button className="text-white transition focus:opacity-70 ">
        <TeenyiconsSearchOutline className="h-[14px] w-[14px]" />
      </button>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="max-w-[120px] border-b border-white bg-black font-normal focus:outline-none"
      />
    </form>
  );
};

export default SearchBar;
