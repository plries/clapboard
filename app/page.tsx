import {
  ClientOnly,
  MovieList,
  PageHeading,
  FilterButtons,
} from "./components";

export default async function Home() {
  return (
    <div className="grid place-items-center p-4">
      <ClientOnly>
        <div className="grid max-w-[1440px] grid-cols-1 place-items-center gap-4">
          <div className="grid h-full w-full grid-cols-1 place-items-center gap-8 place-self-start py-16">
            <PageHeading />
            <FilterButtons />
          </div>
          <MovieList />
        </div>
      </ClientOnly>
    </div>
  );
}
