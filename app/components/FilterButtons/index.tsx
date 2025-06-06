"use client";
import { PAGE_CONST } from "@/app/const";
import { Button } from "../Button";
import { useFilterButtons } from "./useFilterButtons";
import { useMovieList } from "../MovieList/useMovieList";
import { Dropdown } from "../Dropdown";
import { useDropdown } from "../Dropdown/useDropdown";

export const FilterButtons = () => {
  const hook = useFilterButtons({
    categoryOptions: PAGE_CONST.BUTTONS.FILTERS,
  });
  const useDropdownHook = useDropdown();
  const movieListHook = useMovieList({
    genreId: useDropdownHook.selectedOption.id,
  });

  return (
    <div className="grid w-full grid-cols-1 place-items-center gap-2 pb-1 md:w-fit">
      <div className="relative flex w-full flex-col gap-1 rounded-3xl border border-neutral-50/25 p-1 md:flex-row md:rounded-full">
        {PAGE_CONST.BUTTONS.FILTERS.map((button) => {
          const buttonRef = (el: HTMLButtonElement | null) => {
            hook.buttonRefs.current[button.value] = el;
          };

          return (
            <Button
              key={button.value}
              icon={button.icon}
              onClick={() => {
                hook.updateCategory(button.value);
              }}
              additionalClasses={{
                button: `rounded-full w-full justify-start text-nowrap md:justify-center z-10 border-transparent !shadow-none
                ${
                  button.value !== hook.category ||
                  !useDropdownHook.params.get("category")
                    ? "text-neutral-50/75 hover:bg-slate-300/30 hover:border-neutral-50/10 disabled:hover:bg-transparent"
                    : "text-slate-950 bg-neutral-50 md:bg-transparent"
                }
                `,
              }}
              buttonRef={buttonRef}
            >
              {button.label}
            </Button>
          );
        })}
        <div
          className={`absolute top-1 left-0 hidden rounded-full bg-slate-50 inset-shadow-sm inset-shadow-slate-950/50 transition-all duration-300 ease-in-out md:block ${
            useDropdownHook.params.get("category") ? "opacity-100" : "opacity-0"
          }`}
          style={{
            height: hook.buttonHeights[hook.category],
            width: hook.buttonWidths[hook.category],
            transform: `translateX(${hook.buttonPositions[hook.category]}px)`,
          }}
        />
      </div>
      <div className="sticky left-0 z-20 w-fit md:relative md:left-auto">
        <div className="relative">
          <Dropdown
            options={movieListHook.genres}
            label={PAGE_CONST.DROPDOWNS.GENRES.BUTTON}
            toggleDropdown={useDropdownHook.toggleDropdown}
            isOpen={useDropdownHook.isOpen}
            updateSelectedOption={useDropdownHook.updateSelectedOption}
            selectedOption={useDropdownHook.selectedOption}
            type={PAGE_CONST.DROPDOWNS.GENRES.BUTTON}
            additionalClasses={{
              button:
                useDropdownHook.selectedOption.id !== 0 &&
                useDropdownHook.params.get("with_genres")
                  ? "bg-slate-50 border-slate-50 !text-slate-950"
                  : "",
            }}
            dropdownRef={useDropdownHook.dropdownRef}
            buttonRef={useDropdownHook.buttonRef}
            dropdownPosition={useDropdownHook.dropdownPosition}
            params={useDropdownHook.params}
          />
        </div>
      </div>
    </div>
  );
};
