"use client";

import useRoutes from "@/hooks/useRoutes";
import SearchBar from "./SearchBar";
import LinkItem from "./LinkItem";
import useLogo from "@/hooks/useLogo";
import { BsFillChatRightFill } from "react-icons/bs";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const routes = useRoutes();
  const logo = useLogo();

  return (
    <>
      {/* // Desktop nav */}
      <nav className="fixed top-0 z-[20] hidden h-[44px] w-full  items-center justify-between border-b border-white bg-black p-2 lg:flex">
        <div className="flex items-center gap-6">
          {logo}
          <LinkItem linkData={routes.radio} />
          <LinkItem linkData={routes.latest} />
          <LinkItem linkData={routes.explore} />
          <LinkItem linkData={routes.mixtapes} />
          <LinkItem linkData={routes.supporters} />
        </div>
        <div className="flex items-center gap-4">
          <SearchBar />
          <BsFillChatRightFill
            size={12}
            className="mx-2 mt-1 transition hover:opacity-80 focus:opacity-80"
          />
          <LinkItem linkData={routes.myNts} />
          <BiDotsHorizontalRounded size={24} />
        </div>
      </nav>
      {/* Mobile */}
      <nav className="fixed top-0 z-[20] flex h-[44px] w-full items-center justify-between border-b border-white bg-black  p-2 lg:hidden">
        {logo}
        <SearchBar />
        <GiHamburgerMenu size={24} />
      </nav>
    </>
  );
};

export default NavBar;
