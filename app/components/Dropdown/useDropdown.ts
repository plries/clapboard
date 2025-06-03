import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const useDropdown = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
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
      params.set("with_genres", option.id.toString());
    }
    router.push(`?${params.toString()}`);
  };

  return {
    isOpen,
    selectedOption,
    toggleDropdown,
    updateSelectedOption,
  };
};
