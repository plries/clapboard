"use client";
import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react";
import { Button } from "../Button";
import { useSearchInput } from "./useSearchInput";
import { PAGE_CONST } from "@/app/const";
import { IconButton } from "../IconButton";

export const SearchInput = () => {
  const hook = useSearchInput();

  return (
    <div className="flex w-full flex-row items-center justify-center gap-2 rounded-full border border-neutral-50/25 bg-slate-50 px-4 py-2 outline-4 focus-within:outline-slate-300/30">
      <input
        ref={hook.inputRef}
        className="w-full text-slate-950 placeholder:text-slate-950/50 focus:outline-none"
        type="text"
        value={hook.inputValue}
        placeholder={PAGE_CONST.INPUTS.SEARCH}
        onChange={hook.handleInputChange}
        autoFocus
      />
      <IconButton
        additionalClasses={`border-transparent aspect-square rounded-xl bg-transparent !shadow-none duration-300 ease-in-out transition-[opacity,background-color] hover:bg-neutral-200 ${hook.inputValue ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        icon={<XIcon size={16} />}
        name={PAGE_CONST.BUTTONS.CLEAR}
        onClick={hook.handleClear}
      />
      <Button
        additionalClasses={{
          button:
            "rounded-full border-slate-400 transition-colors duration-300 ease-in-out bg-slate-500 text-slate-50 hover:bg-slate-600",
        }}
        icon={<MagnifyingGlassIcon size={16} />}
        onClick={hook.handleSubmit}
        disabled={!hook.inputValue}
      >
        {PAGE_CONST.BUTTONS.SEARCH}
      </Button>
    </div>
  );
};
