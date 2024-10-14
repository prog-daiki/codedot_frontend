import { SearchInput } from "@/app/_components/common/search-input";
import { CategoryList } from "@/features/category/components/category-list";
import { CourseList } from "@/features/course/components/course-list";

interface CourseListProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const CoursesPage = ({ searchParams }: CourseListProps) => {
  return (
    <div className="mt-4">
      <CategoryList />
      <SearchInput />
      <div className="mt-4">
        <CourseList searchParams={searchParams} />
      </div>
    </div>
  );
};

export default CoursesPage;
