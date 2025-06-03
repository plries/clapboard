import { GenreTypes } from "@/app/types";

export type DropdownPropTypes = {
  options: GenreTypes[];
  label: string;
  additionalClasses?: {
    button?: string;
    dropdown?: string;
    dropdownItem?: string;
  };
  toggleDropdown: () => void;
  isOpen: boolean;
  updateSelectedOption: (option: { id: number; name: string }, type: string) => void;
  selectedOption: { id: number; name: string };
  type: "genres" | string;
};
