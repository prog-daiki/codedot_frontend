import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { CourseTitleForm } from "./form/course-title-form";
import { useCreateCourse } from "../api/use-create-course";
import { z } from "zod";
import { toast } from "sonner";

const formSchema = z.object({
  title: z
    .string()
    .min(1, "タイトルは1文字以上です")
    .max(100, "タイトルは100文字以内です"),
});

type FormValues = z.input<typeof formSchema>;

export const CreateCourse = () => {
  const mutation = useCreateCourse();
  const onSubmit = (values: FormValues) => {
    mutation.mutate(values);
  };

  return (
    <Dialog>
      <DialogTrigger className="flex items-center rounded-md bg-sky-700 px-4 py-2 text-white transition hover:bg-sky-900">
        <PlusCircle className="mr-2 size-4" />
        講座を作成
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle className="font-normal text-gray-500">
            新しい講座を作成しよう
          </DialogTitle>
          <DialogDescription>講座の名前は後で変更が可能です</DialogDescription>
        </DialogHeader>
        <CourseTitleForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={{ title: "" }}
        />
      </DialogContent>
    </Dialog>
  );
};
