import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
export const metadata={title:"বাজার দর",description:"প্রয়োজনীয় পণ্যের দাম এক নজরে"};
export default function RootLayout({children}){
  return <html lang="bn"><body><Navbar/><Ticker/><main className="mx-auto max-w-6xl px-4 py-8">{children}</main><Footer/><Toaster/></body></html>;
}
