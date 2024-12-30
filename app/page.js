"use client";
import { redirect } from "next/navigation";

export default function Home() {
  // Redirect to /Pages/landing
  redirect("/Pages/landing");
  return null; // This ensures no content is rendered here
}
