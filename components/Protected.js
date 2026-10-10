"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";

export default function Protected({ children }) {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("এই পাতা দেখতে আগে সাইন ইন করুন", { id: "auth-required" });
      router.replace("/signin");
    }
  }, [isPending, session, router]);

  if (isPending) return <div className="skeleton h-64 rounded-xl" />;
  if (!session) return null;
  return children;
}