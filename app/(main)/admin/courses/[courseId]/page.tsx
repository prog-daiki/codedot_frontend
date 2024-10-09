"use client";

import { IconBadge } from "@/app/_components/common/icon-badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useGetCourse } from "@/features/course/api/use-get-course";
import { CourseDescriptionForm } from "@/features/course/components/form/course-description-form";
import { CourseTitleForm } from "@/features/course/components/form/course-title-form";
import { ArrowLeft, LayoutDashboard, ListChecks, Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import { Banner } from "@/app/_components/common/banner";
import { CourseImageForm } from "@/features/course/components/form/course-image-form";

const AdminCoursePage = ({ params }: { params: { courseId: string } }) => {
  const { courseId } = params;
  const { data: course, isLoading, isError } = useGetCourse(courseId);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader2 className="size-12 animate-spin" />
      </div>
    );
  }

  if (!course) {
    return redirect("/admin/courses");
  }

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
              {/* 入力済みの必須項目 {completionText} */}
            </span>
          </div>
          {/* <Actions
            courseId={params.courseId}
            disabled={!isComplete}
            isPublished={course.publishFlag!}
          /> */}
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
            {/* <ImageForm courseId={params.courseId} initialData={course} /> */}
            {/* <CategoryForm
              courseId={params.courseId}
              initialData={course}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            /> */}
            {/* <PriceForm courseId={course.id} initialData={course} /> */}
            {/* <SourceUrlForm courseId={course.id} initialData={course} /> */}
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl font-semibold">チャプター</h2>
              </div>
              {/* <ChaptersForm courseId={course.id} initialData={chapters} /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCoursePage;
