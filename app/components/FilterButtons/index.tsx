"use client";
import { PAGE_CONST } from "@/app/const";
import { Button } from "../Button";
import { useFilterButtons } from "./useFilterButtons";

export const FilterButtons = () => {
  const hook = useFilterButtons();

  return (
    <div className="flex flex-row flex-wrap gap-2">
      {PAGE_CONST.BUTTONS.map((button) => (
        <Button
          key={button.value}
          label={button.label}
          icon={button.icon}
          onClick={() => {
            hook.updateCategory(button.value);
          }}
          additionalClasses={
            button.value === hook.category
              ? "bg-neutral-50 border-neutral-950/25"
              : "bg-neutral-500 border-neutral-50/25 text-neutral-50"
          }
        />
      ))}
    </div>
  );
};
