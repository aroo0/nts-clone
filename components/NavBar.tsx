"use client";

import useRoutes from "@/hooks/useRoutes";
import SearchBar from "./SearchBar";
import Link from "next/link";
import clsx from "clsx";
import LinkItem from "./LinkItem";
import useLogo from "@/hooks/useLogo";
import { BsFillChatRightFill } from "react-icons/bs";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi"
interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const routes = useRoutes();
  const logo = useLogo();

  return (
    <>
      {/* // Desktop nav */}
      <nav className="hidden fixed w-full lg:flex h-[44px]  bg-black justify-between items-center p-2 z-[10]">
        <div className="flex gap-6 items-center">
          {logo}
          <LinkItem linkData={routes.radio} />
          <LinkItem linkData={routes.latest} />
          <LinkItem linkData={routes.explore} />
          <LinkItem linkData={routes.mixtapes} />
          <LinkItem linkData={routes.supporters} />
        </div>
        <div className="flex gap-4 items-center">
          <SearchBar />
          <BsFillChatRightFill
            size={12}
            className="focus:opacity-80 hover:opacity-80 transition mx-2 mt-1"
          />
          <LinkItem linkData={routes.myNts} />
          <BiDotsHorizontalRounded size={24} />
        </div>
      </nav>
      {/* Mobile */}
      <nav className="fixed lg:hidden w-full flex h-[44px]  bg-black justify-between items-center p-2  z-[10]">
          {logo}
          <SearchBar />
          <GiHamburgerMenu size={24} />
      </nav>
    </>
  );
};

export default NavBar;
