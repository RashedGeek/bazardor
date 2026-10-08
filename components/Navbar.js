"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { bnDate } from "@/lib/bn";
import { getCategories } from "@/lib/api";
import useFetch from "./useFetch";

export default function Navbar() {
  const path = usePathname();
  const { data: cats } = useFetch(getCategories, "c");

  return (
    <header className="border-b border-green-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/">
            <p className="text-2xl font-bold text-brand">🛒 বাজার দর</p>
            <p className="text-xs text-gray-500">{bnDate()}</p>
          </Link>
          <div className="flex gap-2">
            {/* TODO(auth): show profile / sign-out when logged in */}
            <Link href="/signin" className="btn btn-sm sm:btn-md btn-outline border-brand text-brand">
              সাইন ইন
            </Link>
            <Link href="/signup" className="btn btn-sm sm:btn-md bg-brand text-white hover:bg-brand-dark">
              সাইন আপ
            </Link>
          </div>
        </div>

        <nav className="mt-3 flex gap-2 overflow-x-auto pb-1">
          <Link
            href="/"
            className={`rounded-full px-3 py-1 whitespace-nowrap ${
              path === "/" ? "bg-brand text-white" : "bg-brand-soft"
            }`}
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
                className={`rounded-full px-3 py-1 whitespace-nowrap ${
                  on ? "bg-brand text-white" : "bg-brand-soft"
                }`}
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