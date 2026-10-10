"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return toast.error("ইমেইল ও পাসওয়ার্ড দিন");
    setLoading(true);
    const { error } = await signIn.email({ email, password });
    setLoading(false);
    if (error) return toast.error(error.message || "সাইন ইন ব্যর্থ হয়েছে");
    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push("/");
    router.refresh();
  }

  async function social(provider) {
    const { error } = await signIn.social({ provider, callbackURL: "/" });
    if (error) toast.error(error.message || "সোশ্যাল লগইন ব্যর্থ হয়েছে");
  }

  return (
    <div className="mx-auto max-w-md rounded-xl border border-green-200 bg-white p-6">
      <h1 className="mb-4 text-2xl font-bold text-brand">সাইন ইন</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="email" placeholder="ইমেইল" className="input input-bordered w-full"
          value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="পাসওয়ার্ড" className="input input-bordered w-full"
          value={password} onChange={(e) => setPassword(e.target.value)} />
        <button disabled={loading} className="btn w-full bg-brand text-white hover:bg-brand-dark">
          {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
        </button>
      </form>

      <div className="divider">অথবা</div>
      <div className="space-y-2">
        <button onClick={() => social("google")} className="btn btn-outline w-full">Google দিয়ে সাইন ইন</button>
        <button onClick={() => social("github")} className="btn btn-outline w-full">GitHub দিয়ে সাইন ইন</button>
      </div>

      <p className="mt-4 text-center text-sm">
        অ্যাকাউন্ট নেই? <Link href="/signup" className="text-brand underline">সাইন আপ করুন</Link>
      </p>
    </div>
  );
}