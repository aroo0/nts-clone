"use client";

import useRoutes from "@/hooks/useRoutes";
import SearchBar from "./SearchBar";
import LinkItem from "./LinkItem";
import useLogo from "@/hooks/useLogo";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import {
  IconParkOutlineHamburgerButton,
  MaterialSymbolsClose,
  MdiDotsHorizontal,
} from "./Icons";
import { useState } from "react";
interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const routes = useRoutes();
  const logo = useLogo();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);

  return (
    <>
      {/* // Desktop nav */}
      <nav className="fixed top-0 z-[100] hidden h-[44px] w-full  items-center justify-between border-b border-white bg-black p-2 lg:flex">
        <div className="flex w-[500px] items-center gap-6">
          {logo}
          <LinkItem linkData={routes.radio} />
          <LinkItem linkData={routes.latest} />
          <LinkItem linkData={routes.explore} />
          <LinkItem linkData={routes.mixtapes} />
        </div>
        <div className="flex items-center gap-4">
          <SearchBar />
          <LinkItem linkData={routes.myNts} />
          <DropdownMenu.Root modal={false}>
            <DropdownMenu.Trigger asChild>
              <button>
                <MdiDotsHorizontal className="h-[24px] w-[24px] text-white " />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content className="z-[200] mt-1 flex w-[280px] flex-col gap-4 border-b border-white bg-black p-4">
                <DropdownMenu.Item>
                  <LinkItem linkData={routes.radio} />
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                  <LinkItem linkData={routes.latest} />
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                  <LinkItem linkData={routes.explore} />
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                  <LinkItem linkData={routes.mixtapes} />
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </nav>
      {/* Mobile */}
      <nav className="fixed top-0 z-[200] flex h-[44px] w-full items-center justify-between border-b border-white bg-black  p-2 lg:hidden">
        {logo}
        <SearchBar />
        <DropdownMenu.Root open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
          <DropdownMenu.Trigger asChild className="z-[99999] ">
            <button>
              {isMobileNavOpen ? (
                <MaterialSymbolsClose className="h-[28px] w-[28px] opacity-80" />
              ) : (
                <IconParkOutlineHamburgerButton className="h-[28px] w-[28px]  stroke-white" />
              )}
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal className="">
            <DropdownMenu.Content
              sideOffset={9}
              className="z-[110] flex h-[100vh] w-[100vw] flex-col gap-4 border-b border-white bg-black p-4 pt-8"
            >

              <DropdownMenu.Item>
                <LinkItem linkData={routes.radio} />
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                <LinkItem linkData={routes.latest} />
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                <LinkItem linkData={routes.explore} />
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                <LinkItem linkData={routes.mixtapes} />
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </nav>
    </>
  );
};

export default NavBar;
