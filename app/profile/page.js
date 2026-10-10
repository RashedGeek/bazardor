"use client";
import Link from "next/link";
import Protected from "@/components/Protected";
import { useSession } from "@/lib/auth-client";

function Profile() {
  const { data: session } = useSession();
  const u = session?.user;
  return (
    <div className="mx-auto max-w-md rounded-xl border border-green-200 bg-white p-6 text-center">
      <h1 className="mb-4 text-2xl font-bold text-brand">আমার প্রোফাইল</h1>
      {u?.image ? (
        <img src={u.image} alt="" className="mx-auto h-20 w-20 rounded-full" />
      ) : (
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-soft text-4xl">👤</div>
      )}
      <p className="mt-3 text-xl font-semibold">{u?.name}</p>
      <p className="text-gray-500">{u?.email}</p>
      <Link href="/profile/update" className="btn mt-5 bg-brand text-white hover:bg-brand-dark">
        তথ্য আপডেট করুন
      </Link>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Protected>
      <Profile />
    </Protected>
  );
}