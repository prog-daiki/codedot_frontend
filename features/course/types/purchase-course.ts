import { Category } from "@/features/category/types/category";
import { Course } from "./course";
import { Chapter } from "@/features/chapter/types/chapter";

export type PurchaseCourse = {
  course: Course;
  category: Category | null;
  chapters: Chapter[];
};
