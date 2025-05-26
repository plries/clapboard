import { ClientOnly, MovieList, PageHeading } from "./components";

export default async function Home() {
  return (
    <div className="grid place-items-center p-4">
      <ClientOnly>
        <div className="grid max-w-[1440px] place-items-center">
          <PageHeading />
          <MovieList />
        </div>
      </ClientOnly>
    </div>
  );
}
