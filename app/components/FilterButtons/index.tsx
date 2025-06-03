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
    <div className="grid grid-cols-1 gap-2">
      <div className="flex flex-row flex-wrap gap-2">
        {PAGE_CONST.BUTTONS.map((button) => (
          <Button
            key={button.value}
            label={button.label}
            icon={button.icon}
            onClick={() => {
              hook.updateCategory(button.value);
            }}
            additionalClasses={
              button.value === hook.category
                ? "bg-neutral-50 border-neutral-950/25"
                : "bg-neutral-500 border-neutral-50/25 text-neutral-50"
            }
          />
        ))}
      </div>
      <Dropdown
        options={movieListHook.genres}
        label={PAGE_CONST.DROPDOWNS.GENRES}
        toggleDropdown={useDropdownHook.toggleDropdown}
        isOpen={useDropdownHook.isOpen}
        updateSelectedOption={useDropdownHook.updateSelectedOption}
        selectedOption={useDropdownHook.selectedOption}
        type="genres"
      />
    </div>
  );
};
