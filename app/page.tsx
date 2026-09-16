import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const supabase=await createClient();
  const {data:{user}}=await supabase.auth.getUser();
  if(!user) redirect("/login");
  const {data:profile}=await supabase.from("profiles").select("role,display_name").eq("id",user.id).single();
  const isVip=profile?.role==="vip"||profile?.role==="admin";
  return <main className="section"><div className="container"><p className="badge">{isVip?"VIP MEMBER":"FREE MEMBER"}</p><h1>Member Dashboard</h1><p className="muted">Signed in as {user.email}</p><div className="grid"><div className="card"><h3>Daily Tickets</h3><p>Browse published selections.</p><Link className="button" href="/tickets">Open Tickets</Link></div><div className="card"><h3>Your Access</h3><p>{isVip?"You can view VIP selections.":"You currently have free access. VIP selections are locked."}</p></div>{profile?.role==="admin"&&<div className="card"><h3>Admin</h3><p>Manage users, tickets and selections.</p><Link className="button" href="/admin">Open Admin</Link></div>}</div></div></main>
}
