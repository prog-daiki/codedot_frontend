import { SearchInput } from "@/app/_components/common/search-input";
import { CategoryList } from "@/features/category/components/client/category-list";
import { CourseList } from "@/features/course/components/client/course-list";

interface CoursesPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const CoursesPage = ({ searchParams }: CoursesPageProps) => {
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
