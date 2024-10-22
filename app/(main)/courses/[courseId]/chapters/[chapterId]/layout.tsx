"use client";

import { useGetPublishCourse } from "@/features/course/api/use-get-publish-course";
import { PlayerChapter } from "./_components/player-chapter";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const ChapterLayout = ({
  params,
  children,
}: {
  params: { courseId: string; chapterId: string };
  children: React.ReactNode;
}) => {
  const { courseId, chapterId } = params;
  const {
    data: publishCourse,
    isLoading,
    error,
  } = useGetPublishCourse({
    courseId,
  });
  const chapters = publishCourse?.chapters;
  const purchased = publishCourse?.purchased!;
  const currentChapter = chapters?.find((chapter) => chapter.id === chapterId);

  if (purchased === false) {
    return redirect(`/courses/${courseId}`);
  }

  return (
    <>
      <Link
        href={`/courses/${courseId}`}
        className="text-muted-foreground text-md"
      >
        <Button variant="ghost" className="gap-2">
          <ArrowLeft className="size-4" />
          講座画面に戻る
        </Button>
      </Link>
      <div className="grid grid-cols-3 mt-4">
        <div className="col-span-1">
          <div className="bg-slate-600 text-white p-4 rounded-t-md">
            <h3 className="text-xl font-bold">Chapter</h3>
          </div>
          {chapters?.map((chapter) => (
            <PlayerChapter
              key={chapter.id}
              purchased={purchased}
              chapterTitle={chapter.title}
              courseId={courseId}
              chapterId={chapter.id}
              isCurrentChapter={currentChapter?.id === chapter.id}
            />
          ))}
        </div>
        <div className="col-span-2 px-8">{children}</div>
      </div>
    </>
  );
};

export default ChapterLayout;
