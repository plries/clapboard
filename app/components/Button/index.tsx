import { ButtonPropTypes } from "./types";

export const Button = ({
  label,
  icon,
  onClick,
  additionalClasses,
}: ButtonPropTypes) => {
  return (
    <button
      className={`group flex h-fit w-fit cursor-pointer flex-row items-center justify-center gap-2 rounded-xl border px-4 py-2 leading-none shadow-md ${additionalClasses ?? ""}`}
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  );
};
