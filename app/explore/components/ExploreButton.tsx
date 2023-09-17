import { PhCaretDownBold } from "@/components/Icons";
import { twMerge } from "tailwind-merge";
import { drawerTypes } from "../types";

interface ButtonProps {
  name: drawerTypes;
  selectedDrawer: string;
  setSelectedDrawer: (value: drawerTypes) => void;
}

const ExploreButton: React.FC<ButtonProps> = ({
  name,
  selectedDrawer,
  setSelectedDrawer,
}) => {
  const handleClick = () => {
    if (selectedDrawer === name) return setSelectedDrawer("Results");

    setSelectedDrawer(name);
  };
  return (
    <button
      className="flex items-center gap-2 text-sm font-extrabold uppercase hover:opacity-70 focus:opacity-70"
      onClick={() => handleClick()}
    >
      <span>{name}</span>
      <PhCaretDownBold
        className={twMerge(
          "h-3 w-3",
          selectedDrawer === name && "rotate-180 transition",
        )}
      />
    </button>
  );
};

export default ExploreButton;
