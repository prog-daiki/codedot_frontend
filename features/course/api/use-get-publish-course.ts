import { useAuth } from "@clerk/nextjs";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { PublishCourseWithMuxData } from "../types/publish-course-with-muxdata";

interface GetPublishCourseParams {
  courseId: string;
}

export const useGetPublishCourse = ({
  courseId,
}: GetPublishCourseParams): UseQueryResult<PublishCourseWithMuxData, Error> => {
  const { getToken } = useAuth();

  return useQuery<PublishCourseWithMuxData, Error>({
    queryKey: ["publish-course", courseId],
    queryFn: async () => {
      const token = await getToken();
      if (!token) {
        throw new Error("認証トークンの取得に失敗しました");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/publish`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error(`公開講座取得に失敗しました: ${response.statusText}`);
      }

      const data: PublishCourseWithMuxData = await response.json();
      return data;
    },
  });
};
