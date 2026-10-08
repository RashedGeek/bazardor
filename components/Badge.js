import { toBn } from "@/lib/bn";

export default function Badge({ v }) {
  const color =
    v > 0
      ? "text-red-700 bg-red-100"       // price went up ▲ = red
      : v < 0
      ? "text-green-700 bg-green-100"   // price went down ▼ = green
      : "text-gray-600 bg-gray-100";    // no change = gray

  return (
    <span className={`rounded-full px-2 py-0.5 text-sm font-semibold ${color}`}>
      {v > 0 ? "▲" : v < 0 ? "▼" : "—"} {toBn(Math.abs(v))}%
    </span>
  );
}