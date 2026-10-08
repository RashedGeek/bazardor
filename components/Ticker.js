"use client";
import { getProducts } from "@/lib/api";
import { money } from "@/lib/bn";
import useFetch from "./useFetch";
import Badge from "./Badge";
export default function Ticker(){
  const {data}=useFetch(()=>getProducts(),"t");
  if(!data)return <div className="h-10 bg-brand-dark"/>;
  const row=[...data,...data];
  return <div className="overflow-hidden bg-brand-dark py-2 text-white"><div className="marquee gap-8 px-4">
    {row.map((p,i)=><span key={i} className="flex items-center gap-2 whitespace-nowrap text-sm">{p.emoji} {p.name} {money(p.price)}/{p.unit.replace("প্রতি ","")} <Badge v={p.change}/></span>)}
  </div></div>;
}
