import { CaretDownIcon } from "@phosphor-icons/react";
import { Button } from "../Button";
import { DropdownPropTypes } from "./types";

export const Dropdown = ({
  options,
  label,
  additionalClasses,
  toggleDropdown,
  isOpen,
  updateSelectedOption,
  selectedOption,
  type,
  buttonRef,
  dropdownRef,
}: DropdownPropTypes) => {
  return (
    <div className="relative">
      <Button
        label={label}
        icon={<CaretDownIcon size={20} />}
        iconRight
        additionalClasses={`text-neutral-400 border-neutral-50/25 rounded-full ${additionalClasses?.button ?? ""}`}
        onClick={() => toggleDropdown(true)}
        buttonRef={buttonRef}
      />
      {isOpen && (
        <div
          ref={dropdownRef}
          className={`absolute z-50 mt-2 grid w-full grid-cols-2 gap-1 rounded-3xl border border-neutral-50/25 bg-neutral-800 p-2 text-neutral-300 shadow-lg md:grid-cols-3 ${additionalClasses?.dropdown ?? ""}`}
        >
          {type === "genres" && (
            <Button
              label={"all genres"}
              additionalClasses={`lowercase w-full rounded-full !justify-start border-none shadow-none hover:!bg-neutral-50/5 ${additionalClasses?.dropdownItem ?? ""} ${selectedOption.id === 0 ? "bg-neutral-50/10" : ""}`}
              onClick={() =>
                updateSelectedOption({ id: 0, name: "all genres" }, type)
              }
            />
          )}
          {options.map((option) => (
            <Button
              key={option.id}
              label={option.name}
              additionalClasses={`lowercase w-full rounded-full !justify-start border-none shadow-none hover:!bg-neutral-50/5 ${additionalClasses?.dropdownItem ?? ""} ${option.id === selectedOption.id ? "bg-neutral-50/10" : ""}`}
              onClick={() => updateSelectedOption(option, type)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
