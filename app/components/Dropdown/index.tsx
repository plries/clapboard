import ReactDOM from "react-dom";
import { CaretDownIcon } from "@phosphor-icons/react";
import { Button } from "../Button";
import { DropdownPropTypes } from "./types";
import { PAGE_CONST } from "@/app/const";

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
  dropdownPosition,
}: DropdownPropTypes) => {
  return (
    <>
      <Button
        label={label}
        icon={<CaretDownIcon size={20} />}
        iconRight
        additionalClasses={`text-neutral-50/75 border-neutral-50/25 rounded-full ${additionalClasses?.button ?? ""}`}
        onClick={() => toggleDropdown(true)}
        buttonRef={buttonRef}
      />
      {isOpen &&
        dropdownPosition &&
        ReactDOM.createPortal(
          <div
            ref={dropdownRef}
            className={`absolute z-50 mt-2 grid w-fit grid-cols-2 gap-1 rounded-3xl border border-neutral-50/25 bg-slate-950 p-2 text-neutral-50/75 shadow-lg md:grid-cols-3 ${additionalClasses?.dropdown ?? ""}`}
            style={{
              left: dropdownPosition.left,
              top: dropdownPosition.top,
            }}
          >
            {type === PAGE_CONST.DROPDOWNS.GENRES.BUTTON && (
              <Button
                label={PAGE_CONST.DROPDOWNS.GENRES.ALL_GENRES}
                additionalClasses={`lowercase w-full rounded-full !justify-start border-none shadow-none hover:!bg-slate-300/30 ${additionalClasses?.dropdownItem ?? ""} ${selectedOption.id === 0 ? "bg-slate-300/25 !text-neutral-50" : ""}`}
                onClick={() =>
                  updateSelectedOption(
                    { id: 0, name: PAGE_CONST.DROPDOWNS.GENRES.ALL_GENRES },
                    type,
                  )
                }
              />
            )}
            {options.map((option) => (
              <Button
                key={option.id}
                label={option.name}
                additionalClasses={`lowercase w-full rounded-full !justify-start border-none shadow-none hover:!bg-slate-300/30 ${additionalClasses?.dropdownItem ?? ""} ${option.id === selectedOption.id ? "bg-slate-300/25 !text-neutral-50" : ""}`}
                onClick={() => updateSelectedOption(option, type)}
              />
            ))}
          </div>,
          document.body,
        )}
    </>
  );
};
