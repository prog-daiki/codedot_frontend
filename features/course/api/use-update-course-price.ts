import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Course } from "../types/course";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";

type RequestType = Pick<Course, "price">;
type ResponseType = Course;

export const useUpdateCoursePrice = (courseId: string) => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const token = await getToken();
      if (!token) {
        throw new Error("認証トークンの取得に失敗しました");
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/price`,
        {
          method: "PUT",
          body: JSON.stringify(json),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      return await response.json();
    },
    onSuccess: (updatedCourse) => {
      toast.success("講座の価格を更新しました");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["course", courseId] });
      queryClient.setQueryData(["course", courseId], updatedCourse);
    },
    onError: (error) => {
      toast.error("講座の価格の更新に失敗しました");
    },
  });
  return mutation;
};
