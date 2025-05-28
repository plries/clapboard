import { GenreTypes } from "@/app/types";

export type DropdownPropTypes = {
  options: GenreTypes[];
  label: string;
  additionalClasses?: {
    button: string;
    dropdown: string;
    dropdownItem: string;
  };
};
