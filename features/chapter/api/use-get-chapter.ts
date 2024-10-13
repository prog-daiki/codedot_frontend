import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Chapter } from "../types/chapter";
import { useAuth } from "@clerk/nextjs";

export const useGetChapter = (
  courseId: string,
  chapterId: string,
): UseQueryResult<Chapter, Error> => {
  const { getToken } = useAuth();

  return useQuery<Chapter, Error>({
    queryKey: ["chapter", courseId, chapterId],
    queryFn: async () => {
      const token = await getToken();
      if (!token) {
        throw new Error("認証トークンの取得に失敗しました");
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/chapters/${chapterId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error(
          `チャプターの取得に失敗しました: ${response.statusText}`,
        );
      }

      const data: Chapter = await response.json();
      return data;
    },
  });
};
