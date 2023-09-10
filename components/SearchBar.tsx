"use client";

import { useEffect, useState } from "react";
import { TeenyiconsSearchOutline } from "./Icons";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const [value, setValue] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsButtonDisabled(true);
    router.push(`/find?q=${value}&types=episode`);
  };

  useEffect(() => {
    if (isButtonDisabled) {
      const timeoutId = setTimeout(() => {
        setIsButtonDisabled(false);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [isButtonDisabled]);

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="flex items-center gap-2 "
    >
      <button
        className="text-white transition focus:opacity-70 "
        disabled={isButtonDisabled}
      >
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
