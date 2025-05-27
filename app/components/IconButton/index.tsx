import { IconButtonPropTypes } from "./types";

export const IconButton = ({
  icon,
  name,
  onClick,
  additionalClasses,
}: IconButtonPropTypes) => {
  return (
    <button
      className={`group grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-neutral-950/25 bg-neutral-200 p-2 shadow-md ${additionalClasses ?? ""}`}
      name={name}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};
