import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import SessionProvider from "@/app/lib/AuthProvider";
import {getServerSession} from 'next-auth';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "4Devs",
  description: "A social network for developers",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
      <SessionProvider session={session}>
          <main className="flex flex-row justify-between p-4">
              {children}
          </main>
      </SessionProvider>
      </body>
    </html>
);
}
