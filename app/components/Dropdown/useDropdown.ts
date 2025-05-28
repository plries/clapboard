import { useState } from "react";
import { useMovieList } from "../MovieList/useMovieList";

export const useDropdown = () => {
  const hook = useMovieList();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    id: 0,
    name: "",
  });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: { id: number; name: string }) => {
    setSelectedOption(option);

    const filteredMovies = hook.movies.filter((movie) =>
      movie.genre_ids.includes(option.id),
    );

    console.log(filteredMovies);
    hook.setMovies(filteredMovies);

    setIsOpen(false);
  };

  return {
    isOpen,
    selectedOption,
    toggleDropdown,
    handleOptionClick,
  };
};
