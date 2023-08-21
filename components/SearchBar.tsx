import { useState } from "react";
import { FiSearch } from "react-icons/fi"
import { Input } from "./ui/input";

const SearchBar = () => {
  const [value, setValue] = useState("");

  return (
    <form onSubmit={() => {}} className="flex items-center gap-2 ">
      <button className="text-white focus:opacity-70 transition">
         <FiSearch size={16}  />
      </button>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="font-normal border-b border-white bg-black focus:outline-none max-w-[130px]" 
      />
    </form>
  );
};

export default SearchBar;
