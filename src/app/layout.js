import { Inter } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "V Metals",
  description: "Steel Website",
  icons: {
    icon: ['/images/logo.png']
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <ScrollToTop />
        <div className="page-content">
          <main>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
