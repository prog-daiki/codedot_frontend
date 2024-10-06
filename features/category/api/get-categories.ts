import { auth } from "@clerk/nextjs/server";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Category } from "../types/Category";

export const getCategories = async () => {
  const { getToken } = auth();
  const token = await getToken();
  if (!token) {
    throw new Error("認証トークンの取得に失敗しました");
  }

  return useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetchCategories(token);
      return response;
    },
  });
};

/**
 * カテゴリーの一覧を取得する関数
 * @param token 認証トークン
 * @returns カテゴリーの一覧
 * @throws Error カテゴリー取得に失敗した場合
 */
async function fetchCategories(token: string): Promise<Category[]> {
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
}
