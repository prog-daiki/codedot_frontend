"use client";

import { IconBadge } from "@/app/_components/common/icon-badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useGetCourse } from "@/features/course/api/use-get-course";
import { CourseDescriptionForm } from "@/features/course/components/client/course-description-form";
import { CourseTitleForm } from "@/features/course/components/client/course-title-form";
import { ArrowLeft, LayoutDashboard, ListChecks, Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import { Banner } from "@/app/_components/common/banner";
import { CourseImageForm } from "@/features/course/components/client/course-image-form";
import { CourseCategoryForm } from "@/features/course/components/client/course-category-form";
import { CoursePriceForm } from "@/features/course/components/client/course-price-form";
import { CourseSourceUrlForm } from "@/features/course/components/client/course-source-url-form";
import { ChapterForm } from "@/features/chapter/components/client/chapter-form";
import { Actions } from "@/features/course/components/client/course-actions";
import { useGetChapters } from "@/features/chapter/api/use-get-chapters";

const AdminCoursePage = ({ params }: { params: { courseId: string } }) => {
  const { courseId } = params;
  const { data: course, isLoading, isError } = useGetCourse(courseId);
  const { data: chapters = [] } = useGetChapters(courseId);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-white pb-60">
        <Loader2 className="size-12 animate-spin" />
      </div>
    );
  }

  if (!course) {
    return redirect("/admin/courses");
  }

  const publishedChapters = chapters.filter((chapter) => chapter.publishFlag);

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
    course.sourceUrl,
    publishedChapters.length,
  ];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `${completedFields}/${totalFields}`;
  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      <div className="space-y-4">
        <Link href="/admin/courses">
          <Button variant="ghost">
            <ArrowLeft className="size-4 mr-2" />
            講座管理画面に戻る
          </Button>
        </Link>
        {!course.publishFlag && <Banner label="この講座は非公開です" />}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-bold">講座設定</h1>
            <span className="text-sm text-slate-700">
              入力済みの必須項目 {completionText}
            </span>
          </div>
          <Actions
            courseId={courseId}
            disabled={!isComplete}
            isPublished={course.publishFlag!}
          />
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl font-semibold">講座のカスタマイズ</h2>
            </div>
            <CourseTitleForm
              courseId={courseId}
              defaultValues={{ title: course.title }}
            />
            <CourseDescriptionForm
              courseId={courseId}
              defaultValues={{ description: course.description ?? "" }}
            />
            <CourseImageForm
              courseId={courseId}
              defaultValues={{ imageUrl: course.imageUrl ?? "" }}
            />
            <CourseCategoryForm
              courseId={courseId}
              defaultValues={{ categoryId: course.categoryId ?? "" }}
            />
            <CoursePriceForm
              courseId={courseId}
              defaultValues={{ price: course.price ?? 0 }}
            />
            <CourseSourceUrlForm
              courseId={courseId}
              defaultValues={{ sourceUrl: course.sourceUrl ?? "" }}
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl font-semibold">チャプター</h2>
              </div>
              <ChapterForm courseId={course.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCoursePage;
