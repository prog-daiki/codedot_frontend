import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Course } from "../types/course";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";

type ResponseType = Course;

export const useDeleteCourse = (courseId: string) => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const token = await getToken();
      if (!token) {
        throw new Error("認証トークンの取得に失敗しました");
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      return await response.json();
    },
    onSuccess: () => {
      toast.success("講座を削除しました");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error) => {
      toast.error("講座の削除に失敗しました");
    },
  });
  return mutation;
};
