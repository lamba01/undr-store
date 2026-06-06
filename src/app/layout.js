import { Geist } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";

const geist = Geist({ subsets: ["latin"] });

export const metadata = {
  title: "UNDR.",
  description: "Curated fashion for the modern woman",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ colorScheme: "light" }}>
      <body
        className={geist.className}
        style={{ backgroundColor: "white", color: "black" }}
      >
        <CartProvider>
          <Nav />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
