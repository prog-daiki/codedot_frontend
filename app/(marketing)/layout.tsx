import { auth } from "@clerk/nextjs/server";
import { Footer } from "../_components/footer/footer";
import { MarketingHeader } from "./_components/header/marketing-header";
import { redirect } from "next/navigation";

type MarketingLayoutProps = {
  children: React.ReactNode;
};

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  const { userId } = auth();
  if (userId) {
    return redirect("/courses");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MarketingHeader />
      <main className="flex flex-1 flex-col items-center justify-center">
        {children}
      </main>
      <Footer />
    </div>
  );
}
