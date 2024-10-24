import { CopyRight } from "./copy-right";
import { FooterLinks } from "./footer-links";

const footerLinks = [
  { href: "/terms", text: "利用規約" },
  { href: "/privacy", text: "プライバシーポリシー" },
];

export const Footer = () => {
  return (
    <footer className="w-full border-t py-4 px-6 h-20">
      <div className="w-full max-w-[1400px] mx-auto flex flex-col md:flex-row gap-2 items-center h-full justify-between">
        <CopyRight />
        <FooterLinks />
      </div>
    </footer>
  );
};
