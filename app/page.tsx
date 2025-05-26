import { ClientOnly, MovieList } from "./components";
import { PAGE_CONST } from "./const";

export default async function Home() {
  return (
    <div className="grid h-screen place-items-center overflow-y-hidden p-2">
      <div className="relative">
        <ClientOnly>
          <h1 className="sticky left-2 mb-1 w-fit bg-clip-text text-3xl leading-none font-bold text-neutral-50/10 text-shadow-2xs md:text-4xl lg:text-5xl">
            {PAGE_CONST.HEADING}
          </h1>
          <MovieList />
        </ClientOnly>
      </div>
    </div>
  );
}
