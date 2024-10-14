import { MuxData } from "@/features/muxdata/types/mux-data";
import { Chapter } from "./chapter";

export type ChapterWithMuxData = {
  chapter: Chapter;
  mux_data: MuxData | null;
};
