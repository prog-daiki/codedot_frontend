import Link from "next/link";

const footerLinks = [
  { href: "/terms", text: "利用規約" },
  { href: "/privacy", text: "プライバシーポリシー" },
];

export const Footer = () => {
  return (
    <footer className="w-full border-t py-4 px-6 h-20">
      <div className="w-full max-w-[1400px] mx-auto flex items-center h-full justify-between">
        <p className="text-sm text-muted-foreground">
          ©︎2024 Code. All rights reserved.
        </p>
        <div className="flex items-center gap-x-4">
          {footerLinks.map(({ href, text }) => (
            <Link className="transition hover:underline" href={href} key={href}>
              {text}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};
