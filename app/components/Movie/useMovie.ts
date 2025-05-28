"use client";
import { useState, useEffect, useRef } from "react";

export const useMovie = () => {
  const movieRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState(<Readonly<"top" | "bottom">>"top");

  const toggleModal = () => {
    document.body.style.overflow = isOpen ? "auto" : "hidden";
    const moviePosition = movieRef.current?.getBoundingClientRect().top;

    console.log(moviePosition);
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        document.body.style.overflow = "auto";
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    } else {
      document.removeEventListener("keydown", handleEscape);
    }
  });

  useEffect(() => {
    const handlePosition = () => {
      const moviePosition = movieRef.current?.getBoundingClientRect().top;
      const movieHeight = movieRef.current?.getBoundingClientRect().height;
      const dropdownHeight =
        dropdownRef.current?.getBoundingClientRect().height;

      if (!moviePosition || !movieHeight || !dropdownHeight) return;

      if (moviePosition < movieHeight || moviePosition < dropdownHeight) {
        setPosition("bottom");
      } else {
        setPosition("top");
      }
    };

    window.addEventListener("scroll", handlePosition);
    return () => {
      window.removeEventListener("scroll", handlePosition);
    };
  });

  return {
    isOpen,
    setIsOpen,
    toggleModal,
    position,
    movieRef,
    dropdownRef,
  };
};
