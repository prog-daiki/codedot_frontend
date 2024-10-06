import { LoginButton } from "@/app/_components/header/login-button";
import { HeaderLogo } from "@/app/_components/header/header-logo";
import { HeaderNav } from "./header-nav";
import { auth } from "@clerk/nextjs/server";

export const MainHeader = () => {
  const { userId } = auth();
  const isAdmin = userId === process.env.ADMIN_USER_ID;

  return (
    <header className="w-full border-b py-4 px-6 h-20">
      <div className="w-full max-w-[1400px] mx-auto flex items-center justify-between h-full">
        <div className="flex items-center gap-x-8">
          <HeaderLogo />
          <HeaderNav isAdmin={isAdmin} />
        </div>
        <LoginButton />
      </div>
    </header>
  );
};
