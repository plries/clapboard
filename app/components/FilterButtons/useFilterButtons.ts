"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const useFilterButtons = ({
  categoryOptions,
}: { categoryOptions: { value: string; label: string }[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "popular";
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const [buttonHeights, setButtonHeights] = useState<Record<string, number>>({});
  const [buttonWidths, setButtonWidths] = useState<Record<string, number>>({});
  const [buttonPositions, setButtonPositions] = useState<Record<string, number>>({});
  const [selectedCategory, setSelectedCategory] = useState(categoryOptions);

  const updateCategory = (category: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", category);
    router.push(`?${params.toString()}`);
    setSelectedCategory(categoryOptions.filter((c) => c.value === category));
  }

  const calcuateButtonValues = () => {
    const newHeights: Record<string, number> = {};
    const newWidths: Record<string, number> = {};
    const newPositions: Record<string, number> = {};

    categoryOptions.forEach(({ value }) => {
      const el = buttonRefs.current?.[value];
      if (el) {
        newHeights[value] = el.offsetHeight;
        newWidths[value] = el.offsetWidth;
        newPositions[value] = el.offsetLeft;
      }
    });

    setButtonHeights(newHeights);
    setButtonWidths(newWidths);
    setButtonPositions(newPositions);
  }

  useEffect(() => {
    calcuateButtonValues();

    window.addEventListener("resize", () => {
      calcuateButtonValues();
    })
  }, []);

  return {
    updateCategory,
    category,
    buttonRefs,
    buttonHeights,
    buttonWidths,
    buttonPositions,
    selectedCategory,
  };
};