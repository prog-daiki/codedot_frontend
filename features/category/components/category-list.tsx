"use client";

import { useGetCategories } from "../api/use-get-categories";
import { Skeleton } from "@/components/ui/skeleton";
import { CategoryItem } from "./category-item";
import { useSearchParams } from "next/navigation";

const SKELETON_COUNT = 10;

const CategoriesSkeleton = () => (
  <div
    className="flex items-center space-x-2 overflow-x-auto pb-2"
    role="status"
    aria-label="カテゴリーを読み込み中"
  >
    {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
      <Skeleton key={index} className="h-[38px] w-[80px]" />
    ))}
  </div>
);

export const CategoryList = () => {
  const { data: categories = [], isLoading, isError } = useGetCategories();
  const searchParams = useSearchParams();
  const currentCategoryId = searchParams.get("categoryId");

  if (isLoading) {
    return <CategoriesSkeleton />;
  }

  if (isError) {
    return (
      <div className="text-red-500" role="alert">
        カテゴリーの読み込み中にエラーが発生しました。
      </div>
    );
  }

  return (
    <nav aria-label="カテゴリー一覧">
      <ul className="flex items-center space-x-2 overflow-x-auto pb-2">
        <li>
          <CategoryItem label="ALL" value="" isSelected={!currentCategoryId} />
        </li>
        {categories.map(({ id, name }) => (
          <li key={id}>
            <CategoryItem
              label={name}
              value={id}
              isSelected={currentCategoryId === id}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};
