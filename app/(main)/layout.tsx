import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { MainHeader } from "./_components/header/main-header";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  return (
    <div>
      <MainHeader />
      {children}
    </div>
  );
};

export default MainLayout;
