import { Category } from "@/features/category/types/category";
import { Course } from "./course";
import { MuxData } from "@/features/muxdata/types/mux-data";
import { Chapter } from "@/features/chapter/types/chapter";

export type PublishCourseWithMuxData = {
  course: Course;
  category: Category | null;
  chapters: (Chapter & { muxData: MuxData | null })[];
  purchased: boolean;
};
