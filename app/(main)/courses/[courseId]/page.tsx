"use client";

import { IconBadge } from "@/app/_components/common/icon-badge";
import { Button } from "@/components/ui/button";
import { useGetPublishCourse } from "@/features/course/api/use-get-publish-course";
import { formatPrice } from "@/lib/format-price";
import MuxPlayer from "@mux/mux-player-react";
import { ArrowLeft, BookOpen, Loader2 } from "lucide-react";
import Link from "next/link";
import { Chapter } from "./_components/chapter";
import { FaGithub } from "react-icons/fa";
import { usePurchaseCourse } from "@/features/course/api/use-purchase-course";
import { useRouter } from "next/navigation";

const CoursePage = ({ params }: { params: { courseId: string } }) => {
  const { courseId } = params;
  const {
    data: publishCourse,
    isLoading,
    error,
  } = useGetPublishCourse({
    courseId,
  });
  const { mutate: purchaseCourse } = usePurchaseCourse(courseId);
  const router = useRouter();

  const course = publishCourse?.course;
  const chapters = publishCourse?.chapters;
  const category = publishCourse?.category;
  const purchased = publishCourse?.purchased!;
  const chaptersLength = publishCourse?.chapters!.length;

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-white pb-60">
        <Loader2 className="size-12 animate-spin" />
      </div>
    );
  }

  const handleStudy = () => {
    router.push(`/courses/${courseId}/chapters/${chapters![0].id}`);
  };

  return (
    <div className="mt-4">
      <Link href="/courses" className="text-muted-foreground text-md">
        <Button variant="ghost" className="gap-2">
          <ArrowLeft className="size-4" />
          講座一覧に戻る
        </Button>
      </Link>
      <div className="grid grid-cols-5 mt-4">
        <div className="space-y-4 border-r border-r-muted-foreground/30 col-span-2 px-6">
          <p className="text-muted-foreground text-sm">{category?.name}</p>
          <h2 className="text-2xl font-bold">{course?.title}</h2>
          <p className="text-muted-foreground text-sm">{course?.description}</p>
          <div className="flex items-center gap-x-2">
            <p className="text-sky-900 text-md lg:text-xl font-bold">
              {purchased ? "購入済み" : formatPrice(course?.price!)}
            </p>
            <div className="flex items-center gap-x-2">
              <div className="flex items-center gap-x-1 text-slate-500">
                <IconBadge icon={BookOpen} size="sm" />
                <span>
                  {chaptersLength}
                  {chaptersLength! > 1 ? "chapters" : "chapter"}
                </span>
              </div>
            </div>
          </div>
          <div className="flex space-x-4 text-xs lg:text-sm">
            <p className="text-muted-foreground">
              更新日時：{new Date(course?.updateDate!).toLocaleDateString()}
            </p>
            <p className="text-muted-foreground">
              作成日時：{new Date(course?.createDate!).toLocaleDateString()}
            </p>
          </div>
          <div className="flex gap-4">
            <Link href={course?.sourceUrl!} target="_blank">
              <Button variant="outline" className="gap-2">
                <FaGithub className="size-4" />
                Source Code
              </Button>
            </Link>
            {purchased ? (
              <Button onClick={handleStudy}>学習する</Button>
            ) : (
              <Button onClick={() => purchaseCourse()} className="">
                購入する
              </Button>
            )}
          </div>
        </div>
        <div className="relative aspect-video col-span-3 px-6 space-y-4">
          <MuxPlayer
            playbackId={chapters![0].muxData?.playbackId!}
            className="shadow-md"
            autoPlay
          />
          <div className="shadow-sm">
            <div className="bg-slate-600 p-4 rounded-t-md text-white">
              <h3 className="text-xl font-bold">Chapter</h3>
            </div>
            <ul>
              {chapters?.map((chapter) => (
                <Chapter
                  key={chapter.id}
                  purchased={purchased}
                  chapterTitle={chapter.title}
                  chapterDescription={chapter.description!}
                  courseId={params.courseId}
                  chapterId={chapter.id}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
