import { ButtonPropTypes } from "./types";

export const Button = ({
  children,
  icon,
  onClick,
  additionalClasses,
  iconRight,
  disabled,
  buttonRef,
  onMouseOver,
  onMouseOut,
}: ButtonPropTypes) => {
  return (
    <button
      className={`group flex h-fit w-fit cursor-pointer flex-row items-center justify-center gap-2 border px-4 py-2 leading-none shadow-md transition-all duration-300 ease-in-out disabled:cursor-not-allowed disabled:opacity-50 ${additionalClasses?.button ?? ""}`}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseOut}
      disabled={disabled}
      ref={buttonRef}
    >
      {!iconRight && icon}
      <span className={`mb-1 ${additionalClasses?.text ?? ""}`}>
        {children}
      </span>
      {iconRight && icon}
    </button>
  );
};
