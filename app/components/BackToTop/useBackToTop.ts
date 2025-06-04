"use client"
import { useEffect, useState } from "react"

export const useBackToTop = () => {
  const [showButton, setShowButton] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  }

  const handleMouseLeave = () => {
    setIsHovering(false);
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
  })

  return {
    showButton,
    isHovering,
    handleMouseEnter,
    handleMouseLeave,
  }
}