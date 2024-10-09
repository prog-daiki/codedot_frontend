import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Category } from "../types/category";
import { useAuth } from "@clerk/nextjs";

export const useGetCategories = (): UseQueryResult<Category[], Error> => {
  const { getToken } = useAuth();

  return useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: async () => {
      const token = await getToken();
      if (!token) {
        throw new Error("認証トークンの取得に失敗しました");
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/categories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error(
          `カテゴリーの一覧取得に失敗しました: ${response.statusText}`,
        );
      }

      const data: Category[] = await response.json();
      return data;
    },
  });
};
