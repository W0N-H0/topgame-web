import "../styles/globals.css";
import { Pretendard } from "@/styles/font";
import { Toaster } from "react-hot-toast";
import LayoutProvider from "./LayoutProvider";

interface Metadata {
  title: string;
  description: string;
  icons: string;
}

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "탑개미자원",
  description:
    "경기도 고양시에 위치한 고철,비철 매입 및 철거 전문 탑개미자원입니다.",
  icons: "/icon.png",
};

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="ko">
      <body className={Pretendard.className}>
        <Toaster
          containerStyle={{
            fontSize: "0.875rem",
          }}
        />
        <div className="background" />
        <LayoutProvider>{children}</LayoutProvider>
      </body>
    </html>
  );
}
