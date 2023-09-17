import { twMerge } from "tailwind-merge";

interface spinerProps {
  size: string;
  color?: string;
}

const Spiner = ({ size, color }: spinerProps) => {
  return (
    <div role="status" className="flex items-center ml-0.5">
      <div
        className={twMerge("inline-block animate-spin rounded-full border-[2px] border-current border-t-transparent ", size, color)}
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spiner;
