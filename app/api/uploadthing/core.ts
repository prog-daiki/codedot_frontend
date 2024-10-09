import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UTApi } from "uploadthing/server";

const f = createUploadthing();
const utapi = new UTApi();

const handleAuth = (): { userId: string } => {
  const { userId } = auth();
  if (!userId || userId !== process.env.ADMIN_USER_ID)
    throw new Error("認証されていません");
  return { userId };
};

export const ourFileRouter = {
  courseImage: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(handleAuth)
    .onUploadComplete(() => {}),
  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  chapterVideo: f({
    video: { maxFileSize: "512MB", maxFileCount: 1 },
  })
    .middleware(() => handleAuth())
    .onUploadComplete(async ({ file }) => {
      setTimeout(async () => {
        try {
          await utapi.deleteFiles(file.key);
          console.log(`ファイル ${file.key} を10秒後に削除しました。`);
        } catch (error) {
          console.error(
            `ファイル ${file.key} の削除中にエラーが発生しました:`,
            error,
          );
        }
      }, 10000);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
