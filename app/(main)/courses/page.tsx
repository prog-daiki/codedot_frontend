// import { CourseList } from "@/features/course/components/course-list";

type CourseListProps = {
  searchParams: {
    title: string;
    categoryId: string;
  };
};

const CoursesPage = ({ searchParams }: CourseListProps) => {
  return (
    <div className="mt-4">
      {/* <CourseList searchParams={searchParams} /> */}
    </div>
  );
};

export default CoursesPage;
