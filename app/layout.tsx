import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/contexts/cart-context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "@/contexts/user-context";
import { FilterProvider } from "@/contexts/filter-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "vocihub - Your Trusted Game Voucher Platform",
  description: "Your trusted platform for game vouchers and digital products. We provide secure, instant, and reliable services for all your gaming needs. Get your game vouchers, top-ups, and digital products with the best prices and fastest delivery.",
  icons: {
    icon: "/favicon/favicon.ico",
    shortcut: "/favicon/favicon-16x16.png",
    apple: "/favicon/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <CartProvider>
            <UserProvider>
              <FilterProvider>
                <div className="flex min-h-screen flex-col">
                  <Navbar />
                  <main className="flex-1 pt-16">{children}</main>
                  <Footer />
                </div>
                <Toaster />
              </FilterProvider>
            </UserProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
