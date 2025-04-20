-- TEAM MANAGEMENT SCHEMA FOR SUPABASE

-- USERS TABLE (if not already present)
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- TEAMS TABLE (optional, for multi-team support)
create table if not exists teams (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- TEAM MEMBERS TABLE
create table if not exists team_members (
  id uuid primary key default gen_random_uuid(),
  team_id uuid references teams(id) on delete cascade,
  user_id uuid references users(id) on delete cascade,
  email text not null,
  role text not null, -- e.g. 'Admin', 'Manager', 'Viewer'
  status text not null default 'active', -- 'active', 'invited'
  invited_at timestamp with time zone,
  joined_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- INVITES TABLE
create table if not exists invites (
  id uuid primary key default gen_random_uuid(),
  team_id uuid references teams(id) on delete cascade,
  email text not null,
  invited_by uuid references users(id),
  role text not null,
  status text not null default 'pending', -- 'pending', 'accepted', 'revoked'
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable Row Level Security
alter table users enable row level security;
alter table teams enable row level security;
alter table team_members enable row level security;
alter table invites enable row level security;

-- RLS Policies (basic, for demo - customize for your app's needs)
-- Allow users to see their own user record
create policy "Users can view their own record"
  on users for select
  using (auth.uid() = id);

-- Allow team members to view their own team membership
create policy "Team members can view their own membership"
  on team_members for select
  using (auth.uid() = user_id);

-- Allow team members to view invites for their team
create policy "Team members can view invites for their team"
  on invites for select
  using (exists (
    select 1 from team_members
    where team_members.team_id = invites.team_id
      and team_members.user_id = auth.uid()
  ));

-- Allow team admins to insert team members and invites (customize as needed)
create policy "Admins can invite members"
  on invites for insert
  using (true);

-- Allow team admins to update team members (customize as needed)
create policy "Admins can update team members"
  on team_members for update
  using (true);

-- Allow team admins to remove team members (customize as needed)
create policy "Admins can delete team members"
  on team_members for delete
  using (true);

-- You may want to further restrict these policies for production.

-- END OF SCHEMA
