"use client";
import StoreProvider from "./StoreProvider";
import Body from "./components/Body";
import ScrollToTopButton from "./components/ScrollToTopButton";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-full w-full" lang="en" suppressHydrationWarning>
      <StoreProvider>
        <Body>
          {children}
          <ScrollToTopButton />
        </Body>
      </StoreProvider>
    </html>
  );
}
