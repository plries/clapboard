import {
  ClientOnly,
  MovieList,
  PageHeading,
  FilterButtons,
  BackToTop,
} from "./components";

export default async function Home() {
  return (
    <ClientOnly>
      <div className="grid grid-cols-1 place-items-center gap-4 px-4">
        <div className="grid h-full w-full grid-cols-1 place-items-center gap-8 place-self-start py-16">
          <PageHeading />
          <FilterButtons />
        </div>
        <MovieList />
      </div>
      <BackToTop />
    </ClientOnly>
  );
}
