import { IconButtonPropTypes } from "./types";

export const IconButton = ({
  icon,
  name,
  onClick,
  additionialClasses,
}: IconButtonPropTypes) => {
  return (
    <button
      className={`group flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-neutral-100 bg-neutral-200 p-2 shadow-md ${additionialClasses ?? ""}`}
      name={name}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};
