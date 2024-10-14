import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import { Chapter } from "../types/chapter";

type ResponseType = Chapter;

export const useDeleteChapter = (courseId: string, chapterId: string) => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const token = await getToken();
      if (!token) {
        throw new Error("認証トークンの取得に失敗しました");
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/chapters/${chapterId}`,
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
      toast.success("チャプターを削除しました");
      queryClient.invalidateQueries({ queryKey: ["chapters", courseId] });
    },
    onError: (error) => {
      toast.error("チャプターの削除に失敗しました");
    },
  });
  return mutation;
};
