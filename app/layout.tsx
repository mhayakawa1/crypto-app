"use server";
import StoreProvider from "./StoreProvider";
import Body from "./components/Body";
import "./globals.css";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-full w-full" lang="en" suppressHydrationWarning>
      <StoreProvider>
        <Body>{children}</Body>
      </StoreProvider>
    </html>
  );
}
