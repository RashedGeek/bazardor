"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { bnDate } from "@/lib/bn";
import { getCategories } from "@/lib/api";
import useFetch from "./useFetch";
import { useSession, signOut } from "@/lib/auth-client";

export default function Navbar() {
  const path = usePathname();
  const router = useRouter();
  const { data: cats } = useFetch(getCategories, "c");
  const { data: session, isPending } = useSession();

  async function handleSignOut() {
    await signOut();
    toast.success("সাইন আউট সম্পন্ন হয়েছে");
    router.push("/");
    router.refresh();
  }

  return (
    <header className="border-b border-green-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/">
            <p className="text-2xl font-bold text-brand">🛒 বাজার দর</p>
            <p className="text-xs text-gray-500">{bnDate()}</p>
          </Link>

          <div className="flex items-center gap-2">
            {isPending ? (
              <div className="skeleton h-8 w-28 rounded-lg" />
            ) : session ? (
              <>
                <Link href="/profile" className="btn btn-sm sm:btn-md btn-outline border-brand text-brand">
                  👤 {session.user.name?.split(" ")[0] || "প্রোফাইল"}
                </Link>
                <button onClick={handleSignOut} className="btn btn-sm sm:btn-md bg-brand text-white hover:bg-brand-dark">
                  সাইন আউট
                </button>
              </>
            ) : (
              <>
                <Link href="/signin" className="btn btn-sm sm:btn-md btn-outline border-brand text-brand">সাইন ইন</Link>
                <Link href="/signup" className="btn btn-sm sm:btn-md bg-brand text-white hover:bg-brand-dark">সাইন আপ</Link>
              </>
            )}
          </div>
        </div>

        <nav className="mt-3 flex gap-2 overflow-x-auto pb-1">
          <Link
            href="/"
            className={`rounded-full px-3 py-1 whitespace-nowrap ${path === "/" ? "bg-brand text-white" : "bg-brand-soft"}`}
          >
            সব
          </Link>
          {(cats || []).map((c) => {
            const s = c.slug ?? c.id;
            const on = path === `/category/${s}`;
            return (
              <Link
                key={s}
                href={`/category/${s}`}
                className={`rounded-full px-3 py-1 whitespace-nowrap ${on ? "bg-brand text-white" : "bg-brand-soft"}`}
              >
                {c.icon ?? c.emoji} {c.nameBn ?? c.name ?? c.title}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}