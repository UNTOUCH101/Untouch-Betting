import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "UNTOUCH BETTING",
  description: "Football betting analysis and membership platform"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="nav">
          <Link href="/" className="brand">UNTOUCH <span>BETTING</span></Link>
          <nav>
            <Link href="/tickets">Tickets</Link>
            <Link href="/login">Login</Link>
            <Link href="/register" className="navButton">Join Free</Link>
          </nav>
        </header>
        {children}
        <footer className="footer">
          <strong>UNTOUCH BETTING</strong>
          <p>Football analysis and membership platform. No guaranteed winnings.</p>
        </footer>
      </body>
    </html>
  );
}
