create extension if not exists "pgcrypto";

create type public.member_role as enum ('free','vip','admin');
create type public.ticket_status as enum ('PENDING','WON','LOST','VOID');
create type public.selection_access as enum ('FREE','VIP');

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  role public.member_role not null default 'free',
  created_at timestamptz not null default now()
);

create table if not exists public.tickets (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  combined_odds numeric(10,2),
  booking_code text,
  status public.ticket_status not null default 'PENDING',
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.selections (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid not null references public.tickets(id) on delete cascade,
  home_team text not null,
  away_team text not null,
  market text not null,
  odds numeric(10,2) not null,
  access public.selection_access not null default 'FREE',
  created_at timestamptz not null default now()
);

create index if not exists selections_ticket_id_idx on public.selections(ticket_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id,email) values (new.id,new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.tickets enable row level security;
alter table public.selections enable row level security;

create policy "profiles own read" on public.profiles for select using (auth.uid()=id);
create policy "profiles admin read" on public.profiles for select using (
  exists(select 1 from public.profiles p where p.id=auth.uid() and p.role='admin')
);
create policy "profiles admin update" on public.profiles for update using (
  exists(select 1 from public.profiles p where p.id=auth.uid() and p.role='admin')
);

create policy "published tickets read" on public.tickets for select using (
  published=true or exists(select 1 from public.profiles p where p.id=auth.uid() and p.role='admin')
);
create policy "admin ticket insert" on public.tickets for insert with check (
  exists(select 1 from public.profiles p where p.id=auth.uid() and p.role='admin')
);
create policy "admin ticket update" on public.tickets for update using (
  exists(select 1 from public.profiles p where p.id=auth.uid() and p.role='admin')
);
create policy "admin ticket delete" on public.tickets for delete using (
  exists(select 1 from public.profiles p where p.id=auth.uid() and p.role='admin')
);

create policy "selection read" on public.selections for select using (
  access='FREE'
  or exists(select 1 from public.profiles p where p.id=auth.uid() and p.role in ('vip','admin'))
);
create policy "admin selection insert" on public.selections for insert with check (
  exists(select 1 from public.profiles p where p.id=auth.uid() and p.role='admin')
);
create policy "admin selection update" on public.selections for update using (
  exists(select 1 from public.profiles p where p.id=auth.uid() and p.role='admin')
);
create policy "admin selection delete" on public.selections for delete using (
  exists(select 1 from public.profiles p where p.id=auth.uid() and p.role='admin')
);

-- After registering your owner account, run this with your email:
-- update public.profiles set role='admin' where email='YOUR-EMAIL-HERE';
