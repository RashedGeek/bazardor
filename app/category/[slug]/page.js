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

  // price is already a real number (see lib/api.js), so this sorts numerically, not as text
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
          সাজান:
          <select
            className="select select-bordered select-sm sm:select-md"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
        </label>
      </div>
      <Grid items={items} />
    </>
  );
}