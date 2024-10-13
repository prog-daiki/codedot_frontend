import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { MainHeader } from "./_components/header/main-header";
import { Footer } from "../_components/footer/footer";
import { ConfettiProvider } from "@/providers/confetti-provider";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  return (
    <>
      <ConfettiProvider />
      <div className="flex min-h-screen flex-col">
        <MainHeader />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
