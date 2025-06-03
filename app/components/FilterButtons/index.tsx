"use client";
import { PAGE_CONST } from "@/app/const";
import { Button } from "../Button";
import { useFilterButtons } from "./useFilterButtons";
import { useMovieList } from "../MovieList/useMovieList";
import { Dropdown } from "../Dropdown";
import { useDropdown } from "../Dropdown/useDropdown";

export const FilterButtons = () => {
  const hook = useFilterButtons();
  const useDropdownHook = useDropdown();
  const movieListHook = useMovieList({
    genreId: useDropdownHook.selectedOption.id,
  });

  return (
    <div className="grid grid-cols-1 gap-4 pb-1">
      <div className="relative flex flex-row flex-wrap gap-1 rounded-3xl border border-neutral-50/25 p-1 md:rounded-full">
        {PAGE_CONST.BUTTONS.map((button) => (
          <Button
            key={button.value}
            label={button.label}
            icon={button.icon}
            onClick={() => {
              hook.updateCategory(button.value);
            }}
            additionalClasses={`
              rounded-full text-nowrap w-full md:w-fit justify-start 
              ${
                button.value !== hook.category ||
                useDropdownHook.selectedOption.id !== 0
                  ? "text-neutral-400 border-transparent hover:bg-neutral-50/5 !shadow-none"
                  : "bg-neutral-50 border-neutral-50 text-neutral-700"
              }
            `}
            disabled={useDropdownHook.selectedOption.id !== 0}
          />
        ))}
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
        />
      </div>
    </div>
  );
};
