// import { useSearchInput } from "./useSearchInput";

export const SearchInput = () => {
  // const hook = useSearchInput();

  return (
    <div className="w-full rounded-full border border-neutral-50/25 bg-slate-50 px-4 py-2 outline-4 focus-within:outline-slate-300/30">
      <input
        className="w-full text-slate-950 placeholder:text-slate-950/50 focus:outline-none"
        type="text"
        placeholder={"search..."}
      />
    </div>
  );
};
