"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signUp, signIn } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !email || !password) return toast.error("সব ঘর পূরণ করুন");
    if (password.length < 8) return toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    setLoading(true);
    const { error } = await signUp.email({ name, email, password });
    setLoading(false);
    if (error) return toast.error(error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
    toast.success("রেজিস্ট্রেশন সফল! স্বাগতম");
    router.push("/");
    router.refresh();
  }

  async function social(provider) {
    const { error } = await signIn.social({ provider, callbackURL: "/" });
    if (error) toast.error(error.message || "সোশ্যাল লগইন ব্যর্থ হয়েছে");
  }

  return (
    <div className="mx-auto max-w-md rounded-xl border border-green-200 bg-white p-6">
      <h1 className="mb-4 text-2xl font-bold text-brand">সাইন আপ</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" placeholder="নাম" className="input input-bordered w-full"
          value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="ইমেইল" className="input input-bordered w-full"
          value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="পাসওয়ার্ড (কমপক্ষে ৮ অক্ষর)" className="input input-bordered w-full"
          value={password} onChange={(e) => setPassword(e.target.value)} />
        <button disabled={loading} className="btn w-full bg-brand text-white hover:bg-brand-dark">
          {loading ? "অপেক্ষা করুন..." : "রেজিস্টার"}
        </button>
      </form>

      <div className="divider">অথবা</div>
      <div className="space-y-2">
        <button onClick={() => social("google")} className="btn btn-outline w-full">Google দিয়ে সাইন আপ</button>
        <button onClick={() => social("github")} className="btn btn-outline w-full">GitHub দিয়ে সাইন আপ</button>
      </div>

      <p className="mt-4 text-center text-sm">
        আগে থেকেই অ্যাকাউন্ট আছে? <Link href="/signin" className="text-brand underline">সাইন ইন করুন</Link>
      </p>
    </div>
  );
}