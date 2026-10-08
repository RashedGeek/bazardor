"use client";
import { useEffect, useState } from "react";
export default function useFetch(fn,dep){
  const [data,setData]=useState(null),[error,setError]=useState(false);
  useEffect(()=>{setData(null);setError(false);fn().then(setData).catch(()=>setError(true));},[dep]);
  return {data,error,loading:!data&&!error};
}
