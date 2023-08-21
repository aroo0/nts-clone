import clsx from 'clsx'
import Link from 'next/link'
import { IconType } from 'react-icons';

interface linkDataProps {
  label: string;
  href: string;
  active: boolean;
  icon?: IconType;
  className?: string;
}

const LinkItem: React.FC<{ linkData: linkDataProps }> = ({ linkData }) => {

  const {
    label,
    href,
    active,
    icon: Icon,
    className
  } = linkData


  return (
    <Link
    className={clsx("text-sm uppercase focus:opacity-70 hover:opacity-70 mt-0.5 transition flex items-center gap-1", active && "font-extrabold", )}
    href={href}
  >
    {Icon && <Icon size={10}/>}
    <span className={clsx(Icon && "hidden xl:block", className)}>{label}</span>

  </Link>
  )
}

export default LinkItem