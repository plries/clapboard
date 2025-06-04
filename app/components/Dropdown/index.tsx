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
        icon={<CaretDownIcon size={20} />}
        iconRight
        additionalClasses={{
          button: `text-neutral-50/75 border-neutral-50/25 rounded-full ${additionalClasses?.button ?? ""}`,
        }}
        onClick={() => toggleDropdown(true)}
        buttonRef={buttonRef}
      >
        {label}
      </Button>
      {isOpen &&
        dropdownPosition &&
        ReactDOM.createPortal(
          <div
            ref={dropdownRef}
            className={`absolute z-50 mt-2 grid w-fit grid-cols-2 gap-1 rounded-3xl border border-neutral-50/25 bg-[#020618bf] p-2 text-neutral-50/75 shadow-lg md:grid-cols-3 ${additionalClasses?.dropdown ?? ""}`}
            style={{
              backgroundColor: "#020618bf",
              backdropFilter: "blur(16px)",
              left: dropdownPosition.left,
              top: dropdownPosition.top,
            }}
          >
            {type === PAGE_CONST.DROPDOWNS.GENRES.BUTTON && (
              <Button
                additionalClasses={{
                  button: `lowercase w-full rounded-full !justify-start border-transparent shadow-none hover:!bg-slate-300/30 ${additionalClasses?.dropdownItem ?? ""} ${selectedOption.id === 0 ? "bg-slate-300/25 !text-neutral-50 neutral-50/10" : ""}`,
                }}
                onClick={() =>
                  updateSelectedOption(
                    { id: 0, name: PAGE_CONST.DROPDOWNS.GENRES.ALL_GENRES },
                    type,
                  )
                }
              >
                {PAGE_CONST.DROPDOWNS.GENRES.ALL_GENRES}
              </Button>
            )}
            {options.map((option) => (
              <Button
                key={option.id}
                additionalClasses={{
                  button: `lowercase w-full rounded-full !justify-start border-transparent shadow-none hover:!bg-slate-300/30 ${additionalClasses?.dropdownItem ?? ""} ${option.id === selectedOption.id ? "bg-slate-300/25 !text-neutral-50 neutral-50/10" : ""}`,
                }}
                onClick={() => updateSelectedOption(option, type)}
              >
                {option.name}
              </Button>
            ))}
          </div>,
          document.body,
        )}
    </>
  );
};
