import React from "react";
import { ClerkLoading, ClerkLoaded, SignInButton } from "@clerk/nextjs";
import { Loader2, LogInIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const LoginButton = () => {
  return (
    <>
      <ClerkLoading>
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </ClerkLoading>
      <ClerkLoaded>
        <SignInButton forceRedirectUrl="/courses" mode="modal">
          <Button className="flex items-center gap-x-2" variant="outline">
            <LogInIcon className="text-muted-foreground" size={16} />
            ログイン
          </Button>
        </SignInButton>
      </ClerkLoaded>
    </>
  );
};
