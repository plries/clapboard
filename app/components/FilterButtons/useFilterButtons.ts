import { useRouter, useSearchParams } from "next/navigation";

export const useFilterButtons = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "popular";

  const updateCategory = (category: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", category);
    router.push(`?${params.toString()}`);
  }

  return {
    updateCategory,
    category
  };
};