import Link from "next/link";
import Badge from "./Badge";
import { money } from "@/lib/bn";
export default function ProductCard({p}){
  return <Link href={`/product/${p.slug}`} className="block rounded-xl border border-green-200 bg-white p-4 hover:border-brand focus-visible:outline outline-brand">
    <div className="text-4xl">{p.emoji}</div>
    <h3 className="mt-2 text-lg font-bold">{p.name}</h3>
    <p className="text-sm text-gray-500">{p.unit}</p>
    <div className="mt-3 flex items-end justify-between gap-2">
      <div><p className="text-xs text-gray-500">আজকের দাম</p><p className="font-bold text-brand-dark">{money(p.price)}</p></div>
      <Badge v={p.change}/>
    </div></Link>;
}
