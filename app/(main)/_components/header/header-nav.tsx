"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderNavProps {
  isAdmin: boolean;
}

export const HeaderNav = ({ isAdmin }: HeaderNavProps) => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="flex space-x-4 text-muted-foreground text-sm">
      <Link href="/courses">
        <Button
          variant="ghost"
          className={isActive("/courses") ? "bg-gray-100" : ""}
        >
          Courses
        </Button>
      </Link>
      <Link href="/dashboard">
        <Button
          variant="ghost"
          className={isActive("/dashboard") ? "bg-gray-100" : ""}
        >
          Dashboard
        </Button>
      </Link>
      {isAdmin && (
        <Link href="/admin/courses">
          <Button variant="ghost">Admin mode</Button>
        </Link>
      )}
    </nav>
  );
};
