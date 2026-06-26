-- ─────────────────────────────────────────────────────────────────────────
-- Micrositio de recursos Fromus — esquema de la tabla de leads
-- Ejecuta este script en el SQL Editor de Supabase (una sola vez).
-- ─────────────────────────────────────────────────────────────────────────

create table if not exists public.leads (
  id                uuid        primary key default gen_random_uuid(),
  email             text        not null,
  source            text        not null check (source in ('rup', 'licitar', 'lista')),
  consent_marketing boolean     not null default false,
  unsubscribed      boolean     not null default false,
  created_at        timestamptz not null default now(),
  ip                text
);

-- ── Migración para bases ya existentes ─────────────────────────────────────
-- `create table if not exists` NO actualiza el CHECK de una tabla que ya
-- existe. Si la tabla ya estaba creada con ('rup','licitar'), ejecuta esto
-- una vez para permitir también el origen 'lista' (página /lista):
do $$
begin
  alter table public.leads drop constraint if exists leads_source_check;
  alter table public.leads
    add constraint leads_source_check
    check (source in ('rup', 'licitar', 'lista'));
end $$;

-- Normalizar el correo a minúsculas a nivel de base de datos (defensa en
-- profundidad: la API ya lo hace, pero esto lo garantiza siempre).
create or replace function public.leads_normalize_email()
returns trigger
language plpgsql
as $$
begin
  new.email := lower(trim(new.email));
  return new;
end;
$$;

drop trigger if exists trg_leads_normalize_email on public.leads;
create trigger trg_leads_normalize_email
  before insert or update on public.leads
  for each row execute function public.leads_normalize_email();

-- Evitar duplicados por (email, source): un mismo correo puede pedir las dos
-- guías (rup y licitar), pero no la misma guía dos veces. El upsert de la API
-- usa este índice como destino del onConflict.
create unique index if not exists leads_email_source_key
  on public.leads (email, source);

-- Índices de apoyo para consultas/segmentación futuras.
create index if not exists leads_source_idx       on public.leads (source);
create index if not exists leads_created_at_idx    on public.leads (created_at desc);
create index if not exists leads_unsubscribed_idx  on public.leads (unsubscribed);

-- ── Row Level Security ─────────────────────────────────────────────────────
-- RLS activado y SIN políticas para anon/authenticated: nadie puede leer ni
-- escribir desde el cliente. Toda escritura ocurre desde el servidor con la
-- service role key, que evita RLS por diseño.
alter table public.leads enable row level security;

-- (No se crean políticas a propósito. Si en el futuro necesitas dar acceso de
--  lectura a un rol específico, agrégalo aquí de forma explícita.)
