import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Course } from "../types/Course";
import { useAuth } from "@clerk/nextjs";

/**
 * 講座の一覧を取得するカスタムフック
 * @returns 講座の一覧を取得するクエリ結果
 */
export const useGetCourses = (): UseQueryResult<Course[], Error> => {
  const { getToken } = useAuth();

  return useQuery<Course[], Error>({
    queryKey: ["courses"],
    queryFn: async () => {
      const token = await getToken();
      if (!token) {
        throw new Error("認証トークンの取得に失敗しました");
      }
      const response = await fetchCourses(token);
      return response;
    },
  });
};

/**
 * 講座の一覧を取得する関数
 * @param token 認証トークン
 * @returns 講座の一覧
 * @throws Error 講座取得に失敗した場合
 */
async function fetchCourses(token: string): Promise<Course[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`講座の一覧取得に失敗しました: ${response.statusText}`);
  }

  const data: Course[] = await response.json();
  return data;
}
