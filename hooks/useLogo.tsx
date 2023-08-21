"use client"


import clsx from "clsx";
import Link from "next/link";
import { useMemo } from "react";
import useRoutes from "./useRoutes";

const useLogo = () => {
  const routes  = useRoutes()

  const logo = useMemo(() => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 26 26"
        width="28"
        height="28"
      >
        <path fill="#fff" d="M22.7 6.9L22.3 9h-1.5l.5-2c.1-.6.1-1.1-.6-1.1s-1 .5-1.1 1.1l-.4 1.7c-.1.5-.1 1 0 1.5l1.4 4.1c.2.6.3 1.3.1 2l-.6 2.6c-.4 1.5-1.5 2.4-2.9 2.4-1.6 0-2.3-.7-1.9-2.4l.5-2.2h1.5l-.5 2.1c-.2.8 0 1.2.7 1.2.6 0 1-.5 1.2-1.2l.5-2.3c.1-.5.1-1.1-.1-1.6l-1.3-3.8c-.2-.7-.3-1.2-.2-2.1l.4-2c.4-1.6 1.4-2.4 2.9-2.4 1.7 0 2.2.8 1.8 2.3zM11.2 21.1L14.6 6H13l.3-1.3h4.8L17.8 6h-1.7l-3.4 15.1h-1.5zm-4.5 0L8.1 6.6 4.8 21.1H3.5L7.2 4.8h2.2L8 18.7l3.2-14h1.3L8.8 21.1H6.7zM0 26h26V0H0v26z"></path>
      </svg>
    );
  }, []);

  return (
    <Link
    className={clsx("text-sm uppercase focus:opacity-70 hover:opacity-70 transition", routes.home && "font-extrabold")}
    href={routes.home.href}
  >
    <span aria-label="Home">{logo}</span>
  </Link>
  );
};

export default useLogo
