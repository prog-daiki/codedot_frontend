import { useAuth } from "@clerk/nextjs";
import { Course } from "../types/course";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

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
    },
  });
};
