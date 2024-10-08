import { useAuth } from "@clerk/nextjs";
import { Course } from "../types/course";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

/**
 * 講座を取得するカスタムフック
 * @returns 講座を取得するクエリ結果
 */
export const useGetCourse = (
  courseId: string,
): UseQueryResult<Course, Error> => {
  const { getToken } = useAuth();

  return useQuery<Course, Error>({
    queryKey: ["course", courseId],
    queryFn: async () => {
      const token = await getToken();
      if (!token) {
        throw new Error("認証トークンの取得に失敗しました");
      }
      const response = await fetchCourse(token, courseId);
      return response;
    },
  });
};

/**
 * 講座を取得する関数
 * @param token 認証トークン
 * @param courseId 講座ID
 * @returns 講座
 * @throws Error 講座取得に失敗した場合
 */
async function fetchCourse(token: string, courseId: string): Promise<Course> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`講座取得に失敗しました: ${response.statusText}`);
  }

  const data: Course = await response.json();
  return data;
}
