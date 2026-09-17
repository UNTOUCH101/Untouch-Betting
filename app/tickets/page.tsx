import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Tickets() {
  const supabase=await createClient();
  const {data:{user}}=await supabase.auth.getUser();
  if(!user) redirect("/login");
  const {data:profile}=await supabase.from("profiles").select("role").eq("id",user.id).single();
  const vip=profile?.role==="vip"||profile?.role==="admin";
  const {data:tickets}=await supabase.from("tickets").select("*,selections(*)").eq("published",true).order("created_at",{ascending:false});
  return <main className="section"><div className="container"><h1>Daily Tickets</h1><p className="muted">Published analysis and selections.</p>{tickets?.map((t:any)=><div className="card ticket" key={t.id}><div className="row"><div><h2>{t.title}</h2><span className="badge">{t.status}</span></div><strong>{Number(t.combined_odds||0).toFixed(2)}</strong></div>{t.booking_code&&<p>Booking code: <strong>{t.booking_code}</strong></p>}{t.selections?.map((s:any)=><div className={"row "+(s.access==="VIP"&&!vip?"locked":"")} key={s.id}><div><strong>{s.home_team} vs {s.away_team}</strong><div className="muted">{s.market} · {s.odds}</div></div><span className={"badge "+(s.access==="VIP"?"vip":"")}>{s.access==="VIP"&&!vip?"🔒 VIP":s.access}</span></div>)}</div>)}{!tickets?.length&&<div className="card"><p>No published tickets yet.</p></div>}</div></main>
}
