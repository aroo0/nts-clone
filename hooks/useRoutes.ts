import { useMemo } from "react"
import { usePathname } from "next/navigation"
import { MaterialSymbolsPersonOutline } from "@/components/Icons";


const useRoutes = () => {
    const pathname = usePathname();

    const routes = useMemo(() => {
        const routeData = {
            home: {
              label: "Home",
              href: "/",
              active: pathname === "/"
            },
            radio: {
              label: "Radio",
              href: "/radio",
              active: pathname === "/radio"
            },
            latest: {
              label: "Latest",
              href: "/latest",
              active: pathname === "/latest"
            },
            explore: {
              label: "Explore",
              href: "/explore",
              active: pathname === "/explore"
            },
            mixtapes: {
              label: "Infinite Mixtapes",
              href: "/infinite-mixtapes",
              active: pathname === "/infinite-mixtapes"
            },
            myNts: {
              label: "My NTS",
              href: "/my-nts/favourites/shows",
              active: pathname === "/my-nts",
              icon: MaterialSymbolsPersonOutline
            },
            scheduleOne: {
              label: "Schedule Live 1",
              href: "/schedule",
              active: pathname === "/schedule",
            },
            scheduleTwo: {
              label: "Schedule Live 2",
              href: "/schedule/2",
              active: pathname === "/schedule/2",
            },
            scheduleMy: {
              label: "My Schedule",
              href: "/schedule/my",
              active: pathname === "/schedule/my",
            }
          };
        return routeData
        }, [pathname])

    return routes
}

export default useRoutes