import { Playfair_Display, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-playfair",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm-sans",
});

export const metadata = {
  title: {
    default: "Imperial Furnishings",
    template: "%s | Imperial Furnishings",
  },
  description: "Crafting luxury and comfort for your home.",
  icons: { icon: "/images/favicon.ico" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="bg-[#faf7f2] text-[#2b2b2b] font-dm-sans flex flex-col min-h-screen">
        <Navbar />
        <main className="grow">
          {children}
          <Analytics />
        </main>
        <Footer />
      </body>
    </html>
  );
}
