import { QueryClientProvider } from "@/utils";
import type { Metadata } from "next";
import { GlobalStyle } from "../styles/Global";
import StyledComponentsRegistry from "../styles/registry";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import PageLayout from "@/styles/PageLayout";

export const metadata: Metadata = {
  title: "devstacktrend",
  description: `개발자 채용 트렌드 기술 키워드 분석
  프론트엔드, 백엔드, 모바일 개발 기술 키워드 순위
  `,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <QueryClientProvider>
          <StyledComponentsRegistry>
            <GlobalStyle />
            <AppRouterCacheProvider>
              <PageLayout>{children}</PageLayout>
            </AppRouterCacheProvider>
          </StyledComponentsRegistry>
        </QueryClientProvider>
      </body>
    </html>
  );
}
