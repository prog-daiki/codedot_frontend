import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import { Chapter } from "../types/chapter";

type RequestType = Pick<Chapter, "title">;
type ResponseType = Chapter;

export const useUpdateChapterTitle = (courseId: string, chapterId: string) => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const token = await getToken();
      if (!token) {
        throw new Error("認証トークンの取得に失敗しました");
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/chapters/${chapterId}/title`,
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
    onSuccess: (updatedChapter) => {
      toast.success("チャプターのタイトルを更新しました");
      queryClient.invalidateQueries({
        queryKey: ["chapter", courseId, chapterId],
      });
      queryClient.setQueryData(["chapter", chapterId], updatedChapter);
    },
    onError: (error) => {
      toast.error("チャプターのタイトルの更新に失敗しました");
    },
  });
  return mutation;
};