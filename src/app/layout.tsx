import type { Metadata } from "next";
import "./globals.css";
import { ContentProvider } from "@/context/content-context";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "EMotorad · Move Different",
  description: "EMotorad D2C platform stakeholder prototype",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ContentProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </ContentProvider>
      </body>
    </html>
  );
}
