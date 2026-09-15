# UNTOUCH BETTING

Production-ready Next.js + Supabase foundation for a football betting-analysis membership site.

## Features

- Email/password registration and login
- Free and VIP member roles
- Admin-only dashboard
- Match/selection management
- FREE/VIP selection visibility
- Daily ticket publishing
- Combined odds calculation
- Manual booking-code field
- WON/LOST/VOID ticket status
- Supabase Row Level Security
- Mobile-first responsive UI

## 1. Install

```bash
npm install
npm run dev
```

Open http://localhost:3000

## 2. Create Supabase project

Create a Supabase project, then copy its project URL and anon/publishable key into `.env.local`.

Use `.env.example` as the template.

## 3. Database

Open Supabase SQL Editor and run:

`supabase/schema.sql`

Then create your first account through the website.

To make yourself an admin, run the SQL shown at the bottom of `supabase/schema.sql`, replacing the email.

## 4. Email confirmation

Supabase Auth may require email confirmation depending on your project settings. Configure your Site URL and redirect URLs in Supabase Auth settings.

For local development:
http://localhost:3000

For production:
https://YOUR-DOMAIN.com

## 5. Deploy to Vercel

Push this project to your GitHub repository and import it into Vercel.

Add the same environment variables from `.env.local` to Vercel.

Then deploy.

## Security

- Never put a Supabase service-role key in the browser or in `.env.local` used by this app.
- Admin access is checked server-side.
- RLS policies protect profiles, tickets, and selections.
- This project does not place bets, access an MSport wallet, or process gambling funds.

## Responsible use

This is an analysis/membership platform. Do not advertise guaranteed winnings or guaranteed profit. Add your own legal/compliance review before operating commercially.
