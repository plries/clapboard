import ReactDOM from "react-dom";
import { CaretDownIcon, XIcon } from "@phosphor-icons/react";
import { Button } from "../Button";
import { DropdownPropTypes } from "./types";
import { PAGE_CONST } from "@/app/const";
import { IconButton } from "../IconButton";

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
  params,
}: DropdownPropTypes) => {
  return (
    <>
      <IconButton
        additionalClasses={`absolute right-full transition-opacity duration-300 ease-in-out mr-2 ${
          selectedOption.id !== 0 && params?.get("with_genres")
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
        icon={<XIcon size={16} />}
        name={PAGE_CONST.BUTTONS.CLEAR_GENRES}
        onClick={() => updateSelectedOption({ id: 0, name: "" }, type)}
      />
      <Button
        icon={
          <CaretDownIcon size={20} className={isOpen ? "-rotate-180" : ""} />
        }
        iconRight
        additionalClasses={{
          button: `text-neutral-50/75 border-neutral-50/25 rounded-full lowercase ${additionalClasses?.button ?? ""}`,
        }}
        onClick={() => toggleDropdown(true)}
        buttonRef={buttonRef}
      >
        {selectedOption.name ? selectedOption.name : label}
      </Button>
      {isOpen &&
        dropdownPosition &&
        ReactDOM.createPortal(
          <div
            ref={dropdownRef}
            className={`absolute z-50 mt-2 grid w-fit origin-center grid-cols-2 gap-1 rounded-3xl border border-neutral-50/25 bg-[#020618bf] p-2 text-neutral-50/75 shadow-lg md:grid-cols-3 ${additionalClasses?.dropdown ?? ""}`}
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
