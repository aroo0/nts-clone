"use client";

import useRoutes from "@/hooks/useRoutes";
import SearchBar from "./SearchBar";
import LinkItem from "./LinkItem";
import useLogo from "@/hooks/useLogo";
import {
  IconParkOutlineHamburgerButton,
  MaterialSymbolsChatBubble,
  MdiDotsHorizontal,
} from "./Icons";
interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const routes = useRoutes();
  const logo = useLogo();

  return (
    <>
      {/* // Desktop nav */}
      <nav className="fixed top-0 z-[100] hidden h-[44px] w-full  items-center justify-between border-b border-white bg-black p-2 lg:flex">
        <div className="flex items-center gap-6">
          {logo}
          <LinkItem linkData={routes.radio} />
          <LinkItem linkData={routes.latest} />
          <LinkItem linkData={routes.explore} />
          <LinkItem linkData={routes.mixtapes} />
        </div>
        <div className="flex items-center gap-4">
          <SearchBar />
          <MaterialSymbolsChatBubble className="mx-2 mt-1 h-[16px] w-[16px] text-white transition hover:opacity-80 focus:opacity-80" />
          <LinkItem linkData={routes.myNts} />
          <MdiDotsHorizontal className="h-[24px] w-[24px] text-white " />
        </div>
      </nav>
      {/* Mobile */}
      <nav className="fixed top-0 z-[100] flex h-[44px] w-full items-center justify-between border-b border-white bg-black  p-2 lg:hidden">
        {logo}
        <SearchBar />
        <IconParkOutlineHamburgerButton className="h-[28px] w-[28px] stroke-white" />
      </nav>
    </>
  );
};

export default NavBar;
