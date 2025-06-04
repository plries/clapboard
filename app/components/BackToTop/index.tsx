"use client";
import { ArrowUpIcon } from "@phosphor-icons/react";
import { Button } from "../Button";
import { PAGE_CONST } from "@/app/const";
import { useBackToTop } from "./useBackToTop";

export const BackToTop = () => {
  const hook = useBackToTop();

  return (
    <div
      className={`pointer-events-none fixed top-0 left-0 z-10 grid h-screen w-screen place-items-end p-4 transition-opacity duration-300 ease-in-out ${hook.showButton ? "opacity-100" : "opacity-0"}`}
    >
      <Button
        additionalClasses={{
          button: `bg-slate-50 rounded-full !max-w-10 transition-all relative ease-in-out !gap-0 duration-600 hover:!max-w-56 border-neutral-50/25 group-hover:!p-2 ${hook.showButton ? "pointer-events-auto" : "pointer-events-none"}`,
          text: "overflow-hidden mask-gradient-to-r !m-0 pb-1 group-hover:pr-1",
        }}
        icon={
          <>
            <span className="!h-4 !w-4" />
            <ArrowUpIcon className="absolute right-2.5" />
          </>
        }
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        onMouseOver={hook.handleMouseEnter}
        onMouseOut={hook.handleMouseLeave}
        iconRight
      >
        <span className="inline-block translate-x-full text-nowrap transition-transform duration-300 ease-in-out group-hover:translate-x-0">
          {PAGE_CONST.BACK_TO_TOP}
        </span>
      </Button>
    </div>
  );
};
