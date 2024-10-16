import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";

type RequestType = {
  list: { id: string; position: number }[];
};

export const useReorderChapter = (courseId: string) => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const mutation = useMutation<ResponseType, Error, RequestType["list"]>({
    mutationFn: async (chapters) => {
      const token = await getToken();
      if (!token) {
        throw new Error("認証トークンの取得に失敗しました");
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/chapters/reorder`,
        {
          method: "PUT",
          body: JSON.stringify({ list: chapters }),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      return await response.json();
    },
    onSuccess: (updatedChapters) => {
      toast.success("チャプターの順番を更新しました");
      queryClient.invalidateQueries({ queryKey: ["chapters", courseId] });
    },
    onError: (error) => {
      toast.error("チャプターの順番の更新に失敗しました");
    },
  });
  return mutation;
};
