"use client";

import { useState } from "react";
import { TeenyiconsSearchOutline } from "./Icons";
import { useRouter } from "next/navigation";


const SearchBar = () => {
  const [value, setValue] = useState("");
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push(`/find?q=${value}&types=episode`)

    
  }



  return (
    <form onSubmit={(e) =>handleSubmit(e)} className="flex items-center gap-2 ">
      <button className="text-white focus:opacity-70 transition" >
         <TeenyiconsSearchOutline className="w-[14px] h-[14px]" />
      </button>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="font-normal border-b border-white bg-black focus:outline-none max-w-[120px]" 
      />
    </form>
  );
};

export default SearchBar;
