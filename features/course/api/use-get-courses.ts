import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { AdminCourse } from "../types/admin-course";

export const useGetCourses = (): UseQueryResult<AdminCourse[], Error> => {
  const { getToken } = useAuth();

  return useQuery<AdminCourse[], Error>({
    queryKey: ["courses"],
    queryFn: async () => {
      const token = await getToken();
      if (!token) {
        throw new Error("認証トークンの取得に失敗しました");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/courses`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error(`講座の一覧取得に失敗しました: ${response.statusText}`);
      }

      const data: AdminCourse[] = await response.json();
      return data;
    },
  });
};
