"use client";
// TODO(auth): protect this route — redirect to /signin + toast when logged out.
   import Protected from "@/components/Protected";
import { use } from "react";
import { getProduct } from "@/lib/api";
import { money, toBn } from "@/lib/bn";
import useFetch from "@/components/useFetch";
import Badge from "@/components/Badge";
import EmptyState from "@/components/EmptyState";

export default function Detail({ params }) {
  const { slug } = use(params);
  const { data: p, error, loading } = useFetch(() => getProduct(slug), slug);

  if (loading) return <div className="skeleton h-64 rounded-xl" />;
  if (error || !p) return <EmptyState msg="পণ্যটি খুঁজে পাওয়া যায়নি" />;

  const mins = p.markets.map((m) => m.min);
  const maxs = p.markets.map((m) => m.max);
  const min = mins.length ? Math.min(...mins) : p.price;
  const max = maxs.length ? Math.max(...maxs) : p.price;
  const stats = [
    ["সর্বনিম্ন দাম", min],
    ["সর্বোচ্চ দাম", max],
    ["গড় দাম", p.price],
  ];
  const history = [
    ["গতকাল", p.yesterday],
    ["গত সপ্তাহ", p.lastWeek],
    ["গত মাস", p.lastMonth],
  ];

  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-green-200 bg-white p-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-5xl">{p.emoji}</span>
          <h1 className="text-3xl font-bold">{p.name}</h1>
          <Badge v={p.change} />
        </div>
        <p className="mt-3 text-gray-600">
          {p.name}-এর আজকের বাজারদর {p.unit}। দেশের বিভিন্ন বাজারের দামের সারসংক্ষেপ নিচে দেখুন।
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="badge badge-outline">{p.categoryNameBn}</span>
          <span className="badge bg-brand-soft">{p.unit}</span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map(([l, v]) => (
          <div key={l} className="rounded-xl border border-green-200 bg-white p-4">
            <p className="text-sm text-gray-500">{l}</p>
            <p className="text-2xl font-bold text-brand-dark">{money(v)}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {history.map(([l, v]) => (
          <div key={l} className="rounded-xl border border-green-200 bg-white p-4">
            <p className="text-sm text-gray-500">{l}</p>
            <p className="text-xl font-bold">{money(v)}</p>
          </div>
        ))}
      </div>

      <div>
        <h2 className="mb-3 text-xl font-bold">বাজারভিত্তিক আজকের দাম</h2>
        <div className="overflow-x-auto rounded-xl border border-green-200 bg-white">
          <table className="table">
            <thead>
              <tr><th>বাজার</th><th>বিভাগ</th><th>সর্বনিম্ন</th><th>সর্বোচ্চ</th></tr>
            </thead>
            <tbody>
              {p.markets.map((m) => (
                <tr key={m.market}>
                  <td>{m.market}</td>
                  <td>{m.division}</td>
                  <td>{money(m.min)}</td>
                  <td>{money(m.max)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

   export default function ProductPage(props) {
     return (
       <Protected>
         <Detail {...props} />
       </Protected>
     );
   }