import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="container">
          <p className="badge">DISCIPLINED FOOTBALL ANALYSIS</p>
          <h1>UNTOUCH <span>BETTING</span></h1>
          <p>Football selections, match analysis and daily tickets in one clean member platform. Free access is available, with additional analysis reserved for VIP members.</p>
          <div className="actions">
            <Link href="/register" className="button">Create Free Account</Link>
            <Link href="/tickets" className="secondary">View Tickets</Link>
          </div>
        </div>
      </section>
      <section className="container grid">
        <div className="card"><h3>Daily Analysis</h3><p className="muted">Publish structured match selections and odds from the admin dashboard.</p></div>
        <div className="card"><h3>Free + VIP</h3><p className="muted">Separate public selections from members-only analysis.</p></div>
        <div className="card"><h3>Results</h3><p className="muted">Keep a transparent record of published ticket outcomes.</p></div>
        <div className="card"><h3>Mobile First</h3><p className="muted">Designed to work comfortably on phones as well as desktop.</p></div>
      </section>
    </main>
  );
}
