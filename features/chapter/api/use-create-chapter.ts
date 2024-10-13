import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";
import { Chapter } from "../types/chapter";

type RequestType = Pick<Chapter, "title">;
type ResponseType = Chapter;

export const useCreateChapter = (courseId: string) => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const token = await getToken();
      if (!token) {
        throw new Error("認証トークンの取得に失敗しました");
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/chapters`,
        {
          method: "POST",
          body: JSON.stringify(json),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      return await response.json();
    },
    onSuccess: () => {
      toast.success("チャプターを作成しました");
      queryClient.invalidateQueries({ queryKey: ["chapters"] });
    },
    onError: (error) => {
      toast.error("チャプターの作成に失敗しました");
    },
  });
  return mutation;
};
