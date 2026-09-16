 "use client";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/browser";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Register() {
  const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [error,setError]=useState(""); const [msg,setMsg]=useState(""); const router=useRouter();
  async function submit(e:FormEvent){ e.preventDefault(); setError(""); setMsg(""); const {data,error}=await createClient().auth.signUp({email,password}); if(error) setError(error.message); else if(data.session) router.push("/dashboard"); else setMsg("Account created. Check your email if confirmation is enabled."); }
  return <main className="formWrap"><form className="form" onSubmit={submit}><h1>Create account</h1><p className="muted">Start with a free UNTOUCH BETTING membership.</p><label>Email</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/><label>Password</label><input type="password" minLength={6} value={password} onChange={e=>setPassword(e.target.value)} required/><button className="button">Register</button>{error&&<p className="error">{error}</p>}{msg&&<p className="success">{msg}</p>}<p className="muted">Already registered? <Link href="/login">Login</Link></p></form></main>
}
