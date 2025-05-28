import { CaretDownIcon } from "@phosphor-icons/react";
import { Button } from "../Button";
import { DropdownPropTypes } from "./types";
import { useDropdown } from "./useDropdown";

export const Dropdown = ({
  options,
  label,
  additionalClasses,
}: DropdownPropTypes) => {
  const hook = useDropdown();

  return (
    <div className="relative">
      <Button
        label={label}
        icon={<CaretDownIcon size={20} />}
        iconRight
        additionalClasses={`text-neutral-300 border-neutral-50/25 !rounded-full ${additionalClasses?.button ?? ""}`}
        onClick={hook.toggleDropdown}
      />
      {hook.isOpen && (
        <div
          className={`absolute z-50 mt-2 grid w-full grid-cols-2 gap-x-2 gap-y-1 rounded-3xl border border-neutral-50/25 bg-neutral-800 p-2 text-neutral-300 shadow-lg md:grid-cols-3 ${additionalClasses?.dropdown ?? ""}`}
        >
          {options.map((option) => (
            <Button
              key={option.id}
              label={option.name}
              additionalClasses={`lowercase w-full !rounded-2xl !justify-start border-none shadow-none hover:bg-neutral-50/5 ${additionalClasses?.dropdownItem ?? ""}`}
              onClick={() => hook.handleOptionClick(option)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
