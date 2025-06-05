"use client";
import { useState, useEffect, useRef } from "react";

export const useMovieCard = () => {
  const movieRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState(<Readonly<"top" | "bottom">>"top");
  const [xPosition, setXPosition] = useState(<Readonly<"right" | "left">>"right");

  const calculatePosition = () => {
    const movieRect = movieRef.current?.getBoundingClientRect();
    const dropdownHeight = dropdownRef.current?.getBoundingClientRect().height;

    if (!movieRect || !dropdownHeight) return;

    if (movieRect.top < movieRect.height || movieRect.top < dropdownHeight) {
      setPosition("bottom");
    } else {
      setPosition("top");
    }

    if (movieRect.left < window.innerWidth / 2) {
      setXPosition("right");
    } else {
      setXPosition("left");
    }
  };

  const toggleModal = () => {
    
    calculatePosition()
    const nextState = !isOpen;

    if (nextState) {
      movieRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      window.addEventListener("resize", () => {
        movieRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      })
    }

    setIsOpen(nextState);
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
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
    xPosition,
  };
};
