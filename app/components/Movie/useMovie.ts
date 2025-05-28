"use client";
import { useState, useEffect, useRef } from "react";

export const useMovie = () => {
  const movieRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState(<Readonly<"top" | "bottom">>"top");

  const calculatePosition = () => {
    const movieRect = movieRef.current?.getBoundingClientRect();
    const dropdownHeight = dropdownRef.current?.getBoundingClientRect().height;

    if (!movieRect || !dropdownHeight) return;

    if (movieRect.top < movieRect.height || movieRect.top < dropdownHeight) {
      setPosition("bottom");
    } else {
      setPosition("top");
    }
  };

  const toggleModal = () => {
    calculatePosition()
    const nextState = !isOpen;
    document.body.style.overflow = nextState ? "hidden" : "auto";

    if (nextState) {
      movieRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    setIsOpen(nextState);
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
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return {
    isOpen,
    setIsOpen,
    toggleModal,
    position,
    movieRef,
    dropdownRef,
  };
};
