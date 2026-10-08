const D="০১২৩৪৫৬৭৮৯";
export const toBn=(n)=>String(n).replace(/\d/g,d=>D[d]);
export const fromBn=(s)=>Number(String(s).replace(/[০-৯]/g,d=>D.indexOf(d)).replace(/[^\d.-]/g,""))||0;
export const money=(n)=>toBn(Number(n).toLocaleString("en-US"))+" টাকা";
export const bnDate=()=>new Date().toLocaleDateString("bn-BD",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
