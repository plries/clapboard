"use client";
import { PAGE_CONST } from "@/app/const";
import { Button } from "../Button";
import { useFilterButtons } from "./useFilterButtons";
import { useMovieList } from "../MovieList/useMovieList";
import { Dropdown } from "../Dropdown";
import { useDropdown } from "../Dropdown/useDropdown";

export const FilterButtons = () => {
  const hook = useFilterButtons({
    categoryOptions: PAGE_CONST.BUTTONS,
  });
  const useDropdownHook = useDropdown();
  const movieListHook = useMovieList({
    genreId: useDropdownHook.selectedOption.id,
  });

  return (
    <div className="grid grid-cols-1 gap-4 pb-1">
      <div className="relative flex flex-col gap-1 rounded-3xl border border-neutral-50/25 p-1 md:flex-row md:rounded-full">
        {PAGE_CONST.BUTTONS.map((button) => {
          const buttonRef = (el: HTMLButtonElement | null) => {
            hook.buttonRefs.current[button.value] = el;
          };

          return (
            <Button
              key={button.value}
              label={button.label}
              icon={button.icon}
              onClick={() => {
                hook.updateCategory(button.value);
              }}
              additionalClasses={`
              rounded-full w-full justify-start text-nowrap md:justify-center z-10 border-transparent !shadow-none
              ${
                button.value !== hook.category ||
                useDropdownHook.selectedOption.id !== 0
                  ? "text-neutral-400 hover:bg-neutral-50/5"
                  : "text-neutral-700 bg-neutral-50 md:bg-transparent"
              }
            `}
              disabled={useDropdownHook.selectedOption.id !== 0}
              buttonRef={buttonRef}
            />
          );
        })}
        <div
          className={`absolute top-1 left-0 hidden rounded-full bg-neutral-50 transition-all duration-300 ease-in-out md:block ${
            useDropdownHook.selectedOption.id !== 0
              ? "opacity-0"
              : "opacity-100"
          }`}
          style={{
            height: hook.buttonHeights[hook.category],
            width: hook.buttonWidths[hook.category],
            transform: `translateX(${hook.buttonPositions[hook.category]}px)`,
          }}
        />
      </div>
      <div className="sticky left-0 z-20">
        <Dropdown
          options={movieListHook.genres}
          label={PAGE_CONST.DROPDOWNS.GENRES}
          toggleDropdown={useDropdownHook.toggleDropdown}
          isOpen={useDropdownHook.isOpen}
          updateSelectedOption={useDropdownHook.updateSelectedOption}
          selectedOption={useDropdownHook.selectedOption}
          type="genres"
          additionalClasses={{
            button:
              useDropdownHook.selectedOption.id !== 0
                ? "bg-neutral-50 border-neutral-50 text-neutral-700"
                : "",
          }}
          dropdownRef={useDropdownHook.dropdownRef}
          buttonRef={useDropdownHook.buttonRef}
          dropdownPosition={useDropdownHook.dropdownPosition}
        />
      </div>
    </div>
  );
};
