"use client";
import { useState, useEffect } from "react";

export const useMovie = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    document.body.style.overflow = isOpen ? "auto" : "hidden";
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
  })

  return {
    isOpen,
    setIsOpen,
    toggleModal
  };
}