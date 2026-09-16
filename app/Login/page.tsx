 "use client";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/browser";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [error,setError]=useState(""); const router=useRouter();
  async function submit(e:FormEvent){ e.preventDefault(); setError(""); const {error}=await createClient().auth.signInWithPassword({email,password}); if(error) setError(error.message); else router.push("/dashboard"); }
  return <main className="formWrap"><form className="form" onSubmit={submit}><h1>Welcome back</h1><p className="muted">Log in to your UNTOUCH BETTING account.</p><label>Email</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/><label>Password</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} required/><button className="button">Login</button>{error&&<p className="error">{error}</p>}<p className="muted">No account? <Link href="/register">Create one</Link></p></form></main>
}
