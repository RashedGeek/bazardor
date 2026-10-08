import Link from "next/link";
export default function EmptyState({msg="পাতাটি খুঁজে পাওয়া যায়নি"}){
  return <div className="py-24 text-center"><p className="text-6xl font-bold text-brand">৪০৪</p>
  <p className="mt-3 text-lg">{msg}</p><Link href="/" className="btn btn-sm sm:btn-md mt-6 bg-brand text-white hover:bg-brand-dark">হোম পেজে ফিরে যান</Link></div>;
}
