import clsx from "clsx";
import Link from "next/link";
import { IconType } from "react-icons";

interface LinkDataProps {
  label: string;
  href: string;
  active: boolean;
  icon?: IconType;
  className?: string;
}

interface LinkItem {
  children?: React.ReactNode;
  linkData: LinkDataProps;
}

const LinkItem: React.FC<LinkItem> = ({ linkData, children }) => {
  const { label, href, active, icon: Icon, className } = linkData;

  return (
    <Link
      className={clsx(
        "text-sm uppercase focus:opacity-70 hover:opacity-70 mt-0.5 transition flex items-center gap-1",
        active && "font-extrabold"
      )}
      href={href}
    >
      {children}
      {Icon && <Icon size={10} />}
      <span className={clsx(Icon && "hidden xl:block", className)}>
        {label}
      </span>
    </Link>
  );
};

export default LinkItem;
