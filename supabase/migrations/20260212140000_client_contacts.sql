-- Run in Supabase SQL Editor (or via supabase db push) before using the contact form.
-- View rows: Table Editor → client_contacts

create table if not exists public.client_contacts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  company text,
  service text,
  message text
);

create index if not exists client_contacts_created_at_idx
  on public.client_contacts (created_at desc);

alter table public.client_contacts enable row level security;

-- Inserts go through the Next.js API route using the service role key (bypasses RLS).
-- Optional: allow anonymous inserts only if you remove the API route and use the anon key from the browser
-- (not recommended without extra abuse protections).

comment on table public.client_contacts is 'Inbound leads from the website contact form';
