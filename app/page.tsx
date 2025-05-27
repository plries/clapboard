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
        <div className="grid max-w-[1440px] place-items-center">
          <div className="grid grid-cols-1 gap-8 p-16">
            <PageHeading />
            <FilterButtons />
          </div>
          <MovieList />
        </div>
      </ClientOnly>
    </div>
  );
}
