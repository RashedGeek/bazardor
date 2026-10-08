"use client";
import Image from "next/image";
import { getProducts } from "@/lib/api";
import useFetch from "@/components/useFetch";
import Grid, { Skeleton } from "@/components/Grid";

const Sec = ({ id, title, arrow, arrowClass, sub, children }) => (
  <section id={id} className="mt-12 scroll-mt-6">
    <h2 className="text-2xl font-bold">
      {title} {arrow && <span className={arrowClass}>{arrow}</span>}
    </h2>
    {sub && <p className="mb-4 text-gray-600">{sub}</p>}
    <div className="mt-4">{children}</div>
  </section>
);

export default function Home() {
  const { data, error, loading } = useFetch(() => getProducts(), "all");

  const up = data
    ? [...data].filter((p) => p.change > 0).sort((a, b) => b.change - a.change).slice(0, 6)
    : [];
  const down = data
    ? [...data].filter((p) => p.change < 0).sort((a, b) => a.change - b.change).slice(0, 6)
    : [];

  const body = (items, n) =>
    loading ? (
      <Skeleton n={n} />
    ) : error ? (
      <p className="text-red-600">ডেটা লোড করা যায়নি</p>
    ) : (
      <Grid items={items} />
    );

  return (
    <>
      <section className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <p className="text-brand font-semibold">প্রতিদিনের বাজার আপডেট</p>
          <h1 className="mt-2 text-4xl font-bold leading-tight md:text-5xl">
            আজকের বাজারদর, এক নজরে
          </h1>
          <p className="mt-4 max-w-md text-gray-600">
            চাল, ডাল, সবজি, মাছ ও মাংসের সর্বশেষ দাম দেখুন এবং কোন পণ্যের দাম বাড়ল বা কমল জানুন।
          </p>
          <a href="#সব-পণ্য" className="btn mt-6 bg-brand text-white hover:bg-brand-dark">
            সব পণ্য দেখুন
          </a>
        </div>
        <Image
          src="/hero.png"
          alt="বাজারের ঝুড়ি"
          width={315}
          height={263}
          priority
          className="mx-auto h-auto w-full max-w-sm"
        />
      </section>

      <Sec title="আজ দাম বেড়েছে" arrow="▲" arrowClass="text-red-600">
        {body(up, 6)}
      </Sec>

      <Sec title="আজ দাম কমেছে" arrow="▼" arrowClass="text-green-600">
        {body(down, 6)}
      </Sec>

      <Sec id="সব-পণ্য" title="সব পণ্য" sub="সব পণ্যের আজকের গড় দাম">
        {body(data || [], 8)}
      </Sec>
    </>
  );
}