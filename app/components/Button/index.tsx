import { ButtonPropTypes } from "./types";

export const Button = ({
  label,
  icon,
  onClick,
  additionalClasses,
  iconRight,
  disabled,
  buttonRef,
}: ButtonPropTypes) => {
  return (
    <button
      className={`group flex h-fit w-fit cursor-pointer flex-row items-center justify-center gap-2 border px-4 py-2 leading-none shadow-md transition-all duration-300 ease-in-out disabled:cursor-not-allowed disabled:opacity-50 ${additionalClasses ?? ""}`}
      onClick={onClick}
      disabled={disabled}
      ref={buttonRef}
    >
      {!iconRight && icon}
      <span className="mb-1">{label}</span>
      {iconRight && icon}
    </button>
  );
};
