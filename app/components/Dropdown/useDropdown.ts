"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const useDropdown = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    id: Number(searchParams.get("with_genres") || 0),
    name: "",
  });
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [isMobile, setIsMobile] = useState(false);

  const params = new URLSearchParams(searchParams);
    
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  const updateSelectedOption = (option: { id: number; name: string }, type: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (type === "genres") {
      if (option.id === 0) {
        params.delete("with_genres");
      } else {
        params.set("with_genres", option.id.toString());
        params.delete("category");
        params.delete("query");
      }
    }
    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [])

  useEffect(() => {
    const updatePosition = () => {
      if (buttonRef.current && dropdownRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const dropdownRect = dropdownRef.current.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom + window.scrollY,
          left: isMobile ? (window.innerWidth / 2 + window.scrollX) - dropdownRect.width / 2 : rect.left + window.scrollX,
        });
      }
    };    

    requestAnimationFrame(updatePosition);
    const handleResize = () => requestAnimationFrame(updatePosition);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return {
    isOpen,
    selectedOption,
    toggleDropdown,
    updateSelectedOption,
    buttonRef,
    dropdownRef,
    dropdownPosition,
    params,
  };
};
