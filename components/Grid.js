import ProductCard from "./ProductCard";
export const Skeleton=({n=8})=><div className={gridCls}>{Array.from({length:n}).map((_,i)=><div key={i} className="skeleton h-36 rounded-xl"/>)}</div>;
export const gridCls="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
export default function Grid({items}){return <div className={gridCls}>{items.map(p=><ProductCard key={p.slug} p={p}/>)}</div>;}
