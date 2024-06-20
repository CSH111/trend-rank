import { QueryClientProvider } from "@/utils";
import type { Metadata } from "next";
import { GlobalStyle } from "../styles/Global";
import StyledComponentsRegistry from "../styles/registry";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import PageLayout from "@/styles/PageLayout";
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
