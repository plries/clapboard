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
    
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  const updateSelectedOption = (option: { id: number; name: string }, type: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    const params = new URLSearchParams(searchParams);
    if (type === "genres") {
      if (option.id === 0) {
        params.delete("with_genres");
      } else {
        params.set("with_genres", option.id.toString());
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
  })

  return {
    isOpen,
    selectedOption,
    toggleDropdown,
    updateSelectedOption,
    buttonRef,
    dropdownRef,
  };
};
