import { SearchInput } from "@/app/_components/common/search-input";
import { CategoryList } from "@/features/category/components/category-list";

type Props = {
  children: React.ReactNode;
};

const CoursesLayout = async ({ children }: Props) => {
  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto px-6 py-8">{children}</div>
    </div>
  );
};

export default CoursesLayout;
