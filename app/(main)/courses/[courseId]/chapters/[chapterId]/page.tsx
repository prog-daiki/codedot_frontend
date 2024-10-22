"use client";

import { useGetChapter } from "@/features/chapter/api/use-get-chapter";
import MuxPlayer from "@mux/mux-player-react";

const ChapterPage = ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { courseId, chapterId } = params;
  const { data: chapter } = useGetChapter(courseId, chapterId);

  return (
    <>
      <div className="relative aspect-video space-y-4">
        <MuxPlayer
          playbackId={chapter?.mux_data?.playbackId!}
          className="shadow-md"
          autoPlay
        />
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-bold">{chapter?.chapter.title}</h1>
          <p className="text-sm text-muted-foreground">
            {chapter?.chapter.description}
          </p>
        </div>
      </div>
    </>
  );
};

export default ChapterPage;
