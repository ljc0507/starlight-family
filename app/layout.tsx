import type { Metadata } from "next";
import "./globals.css";
import OfflineRegister from "./offline-register";

export const metadata: Metadata = {
  title: "星光救援指揮中心 2.1",
  description: "給 3–5 歲孩子的易懂圖像式睡前生活、數學、注音與合作冒險",
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body><OfflineRegister />{children}</body>
    </html>
  );
}
