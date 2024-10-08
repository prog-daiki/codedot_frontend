"use client";

import { AdminCourseList } from "@/features/course/components/admin-course-list";

const AdminCoursesPage = () => {
  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <AdminCourseList />
      </div>
    </div>
  );
};

export default AdminCoursesPage;
