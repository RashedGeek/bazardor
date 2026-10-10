"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Protected from "@/components/Protected";
import { authClient, useSession } from "@/lib/auth-client";

function UpdateForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user?.name) setName(session.user.name);
  }, [session]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return toast.error("নাম লিখুন");
    setLoading(true);
    const { error } = await authClient.updateUser({ name: name.trim() });
    setLoading(false);
    if (error) return toast.error(error.message || "আপডেট ব্যর্থ হয়েছে");
    toast.success("তথ্য আপডেট হয়েছে");
    router.push("/profile");
  }

  return (
    <div className="mx-auto max-w-md rounded-xl border border-green-200 bg-white p-6">
      <h1 className="mb-4 text-2xl font-bold text-brand">তথ্য আপডেট করুন</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" placeholder="নাম" className="input input-bordered w-full"
          value={name} onChange={(e) => setName(e.target.value)} />
        <button disabled={loading} className="btn w-full bg-brand text-white hover:bg-brand-dark">
          {loading ? "অপেক্ষা করুন..." : "Update Information"}
        </button>
      </form>
    </div>
  );
}

export default function UpdatePage() {
  return (
    <Protected>
      <UpdateForm />
    </Protected>
  );
}