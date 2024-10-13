import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import { Chapter } from "../types/chapter";

type RequestType = { id: string; position: number }[];
type ResponseType = Chapter;

export const useReorderChapter = (courseId: string) => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const token = await getToken();
      if (!token) {
        throw new Error("認証トークンの取得に失敗しました");
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/chapters/reorder`,
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
      toast.success("チャプターの順番を更新しました");
      queryClient.invalidateQueries({ queryKey: ["chapters"] });
      queryClient.invalidateQueries({ queryKey: ["chapters"] });
      queryClient.setQueryData(["chapters"], updatedCourse);
    },
    onError: (error) => {
      toast.error("チャプターの順番の更新に失敗しました");
    },
  });
  return mutation;
};
