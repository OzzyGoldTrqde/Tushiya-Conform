-- ==========================================================================
-- Tushiya Conform — Supabase Initial Schema
-- Migration: 001_initial_schema.sql
-- Run via: supabase db push  OR  paste into Supabase SQL editor
-- ==========================================================================

-- Enable required extensions
create extension if not exists "uuid-ossp";

-- ==========================================================================
-- DOCUMENTS
-- ==========================================================================
create table if not exists public.documents (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  type         text not null check (type in (
                 'risk-assessment','hira','method-statement',
                 'toolbox-talk','ptw','policy'
               )),
  title        text not null,
  data         jsonb default '{}'::jsonb,
  status       text not null default 'draft' check (status in ('draft','complete','archived')),
  review_date  date,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- Auto-update updated_at
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger documents_updated_at
  before update on public.documents
  for each row execute procedure public.handle_updated_at();

-- ==========================================================================
-- SHARE LINKS
-- ==========================================================================
create table if not exists public.share_links (
  id          uuid primary key default uuid_generate_v4(),
  document_id uuid not null references public.documents(id) on delete cascade,
  token       uuid not null unique default uuid_generate_v4(),
  expires_at  timestamptz not null,
  created_at  timestamptz not null default now()
);

-- ==========================================================================
-- SIGNATURES
-- ==========================================================================
create table if not exists public.signatures (
  id              uuid primary key default uuid_generate_v4(),
  document_id     uuid not null references public.documents(id) on delete cascade,
  share_link_id   uuid references public.share_links(id) on delete set null,
  signer_name     text not null,
  signature_data  text,           -- base64 encoded SVG/PNG from signature_pad
  signed_at       timestamptz not null default now()
);

-- ==========================================================================
-- ROW LEVEL SECURITY
-- ==========================================================================

-- Documents: users can only access their own
alter table public.documents enable row level security;

create policy "Users can view own documents"
  on public.documents for select
  using (auth.uid() = user_id);

create policy "Users can insert own documents"
  on public.documents for insert
  with check (auth.uid() = user_id);

create policy "Users can update own documents"
  on public.documents for update
  using (auth.uid() = user_id);

create policy "Users can delete own documents"
  on public.documents for delete
  using (auth.uid() = user_id);

-- Share links: created by document owner; publicly readable by token
alter table public.share_links enable row level security;

create policy "Document owner can create share links"
  on public.share_links for insert
  with check (
    exists (select 1 from public.documents
            where id = document_id and user_id = auth.uid())
  );

create policy "Share links publicly readable by token"
  on public.share_links for select
  using (true);   -- token is the access control; scoped in application layer

-- Signatures: publicly insertable (via share token); owner can read
alter table public.signatures enable row level security;

create policy "Signatures publicly insertable via share link"
  on public.signatures for insert
  with check (true);

create policy "Document owner can read signatures"
  on public.signatures for select
  using (
    exists (select 1 from public.documents
            where id = document_id and user_id = auth.uid())
  );

-- ==========================================================================
-- INDEXES
-- ==========================================================================
create index if not exists idx_documents_user_id   on public.documents(user_id);
create index if not exists idx_documents_type      on public.documents(type);
create index if not exists idx_documents_status    on public.documents(status);
create index if not exists idx_share_links_token   on public.share_links(token);
create index if not exists idx_signatures_document on public.signatures(document_id);
