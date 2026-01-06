create table if not exists attempts (
  id uuid primary key,
  test_type text not null check (test_type in ('adhd','iq')),
  created_at timestamp with time zone default now(),
  score integer not null,
  max_score integer not null,
  payload jsonb not null,
  paid boolean not null default false,
  stripe_session_id text
);

create index if not exists attempts_test_type_idx on attempts(test_type);
create index if not exists attempts_paid_idx on attempts(paid);
create index if not exists attempts_created_at_idx on attempts(created_at);
