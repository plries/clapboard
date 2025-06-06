import {
  ClientOnly,
  MovieList,
  PageHeading,
  FilterButtons,
  BackToTop,
  SearchInput,
} from "./components";

export default async function Home() {
  return (
    <ClientOnly>
      <div className="grid grid-cols-1 place-items-center gap-4 px-4">
        <div className="grid h-full max-w-3xl grid-cols-1 place-items-center gap-8 py-16">
          <PageHeading />
          <SearchInput />
          <FilterButtons />
        </div>
        <MovieList />
      </div>
      <BackToTop />
    </ClientOnly>
  );
}
