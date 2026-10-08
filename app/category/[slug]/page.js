"use client";
import { use, useState } from "react";
import { getProducts } from "@/lib/api";
import useFetch from "@/components/useFetch";
import Grid, { Skeleton } from "@/components/Grid";
import EmptyState from "@/components/EmptyState";

export default function Category({ params }) {
  const { slug } = use(params);
  const [sort, setSort] = useState("default");
  const { data, error, loading } = useFetch(() => getProducts(slug), slug);

  if (loading) return <Skeleton />;
  if (error || !data.length) return <EmptyState msg="এই ক্যাটাগরিতে কোনো পণ্য নেই" />;

  // price is a real number (see lib/api.js), so this sorts by value, not as text
  const items =
    sort === "asc"
      ? [...data].sort((a, b) => a.price - b.price)
      : sort === "desc"
      ? [...data].sort((a, b) => b.price - a.price)
      : data;

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">
          {data[0].categoryIcon} {data[0].categoryNameBn}
        </h1>

        <label className="flex items-center gap-2">
          <span>সাজান:</span>
          <div className="relative">
            <select
              className="select select-bordered select-sm sm:select-md appearance-none bg-none pr-9"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="default">ডিফল্ট</option>
              <option value="asc">দাম: কম থেকে বেশি</option>
              <option value="desc">দাম: বেশি থেকে কম</option>
            </select>
            {/* chevron icon */}
            <svg
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </label>
      </div>
      <Grid items={items} />
    </>
  );
}