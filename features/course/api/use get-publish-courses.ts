import { useAuth } from "@clerk/nextjs";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { PublishCourse } from "../types/publish-course";

interface PublishCoursesParams {
  title: string;
  categoryId: string;
}

/**
 * 公開されている講座の一覧を取得するカスタムフック
 * @returns 公開されている講座の一覧を取得するクエリ結果
 */
export const useGetPublishCourses = ({
  title,
  categoryId,
}: PublishCoursesParams): UseQueryResult<PublishCourse[], Error> => {
  const { getToken } = useAuth();

  return useQuery<PublishCourse[], Error>({
    queryKey: ["publish-courses", title, categoryId],
    queryFn: async () => {
      const token = await getToken();
      if (!token) {
        throw new Error("認証トークンの取得に失敗しました");
      }
      const response = await fetchPublishCourses(token, title, categoryId);
      return response;
    },
  });
};

/**
 * 公開されている講座の一覧を取得する関数
 * @param token 認証トークン
 * @returns 公開されている講座の一覧
 * @throws Error 公開講座一覧取得に失敗した場合
 */
async function fetchPublishCourses(
  token: string,
  title: string,
  categoryId: string,
): Promise<PublishCourse[]> {
  const params = new URLSearchParams();
  if (title) params.append("title", title);
  if (categoryId) params.append("categoryId", categoryId);

  const url = `${process.env.NEXT_PUBLIC_API_URL}/courses/publish${params.toString() ? `?${params.toString()}` : ""}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`公開講座一覧取得に失敗しました: ${response.statusText}`);
  }

  const data: PublishCourse[] = await response.json();
  return data;
}
