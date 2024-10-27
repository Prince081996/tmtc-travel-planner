import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./Providers";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Travel Planner",
  description: "Helps To Find Best Places in cities",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>  
      <ToastContainer />
       <AuthProvider>
        {children}
       </AuthProvider></body>
    </html>
  );
}
