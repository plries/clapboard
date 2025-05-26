"use client";
import { PAGE_CONST } from "@/app/const";
import { FilmSlateIcon } from "@phosphor-icons/react";

export const PageHeading = () => {
  return (
    <div className="grid place-items-center p-16">
      <FilmSlateIcon size={128} weight="light" className="text-neutral-50/6" />
      <h1 className="bg-clip-text text-center text-3xl leading-none font-bold text-neutral-50/10 text-shadow-2xs md:text-4xl lg:text-5xl">
        {PAGE_CONST.HEADING}
      </h1>
    </div>
  );
};
