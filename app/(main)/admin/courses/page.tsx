"use client";

import { AdminCourseList } from "@/features/course/components/client/admin-course-list";
import { CreateCourse } from "@/features/course/components/client/create-course";

const AdminCoursesPage = () => {
  return (
    <div className="space-y-4">
      <CreateCourse />
      <AdminCourseList />
    </div>
  );
};

export default AdminCoursesPage;
