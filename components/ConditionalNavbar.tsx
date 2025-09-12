"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();
  
  // Don't render navbar on demo page
  if (pathname === "/demo") {
    return null;
  }
  
  return <Navbar />;
}
