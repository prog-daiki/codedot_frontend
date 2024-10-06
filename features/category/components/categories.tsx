"use client";

import { useGetCategories } from "../api/use-get-categories";
import { Skeleton } from "@/components/ui/skeleton";
import { CategoryItem } from "./category-item";

// スケルトンの数を定数として定義
const SKELETON_COUNT = 10;

/**
 * カテゴリーのローディング状態を表示するスケルトンコンポーネント
 */
const CategoriesSkeleton: React.FC = () => (
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

/**
 * カテゴリー一覧を表示するコンポーネント
 */
export const Categories: React.FC = () => {
  const { data: categories = [], isLoading, isError } = useGetCategories();

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
        {categories.map(({ id, name }) => (
          <li key={id}>
            <CategoryItem label={name} value={id} />
          </li>
        ))}
      </ul>
    </nav>
  );
};
