CREATE TABLE roles(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role role_type NOT NULL DEFAULT 'PARTICIPANT'
);

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_roles(
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id),
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE hackathons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  created_by UUID REFERENCES users(id),
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  status hackathon_status DEFAULT 'UPCOMING',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE registrations(
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    hackathon_id UUID REFERENCES hackathons(id) ON DELETE CASCADE,
    PRIMARY KEY(user_id,hackathon_id),
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  hackathon_id UUID REFERENCES hackathons(id) ON DELETE CASCADE,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE team_members (
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  PRIMARY KEY(team_id, user_id),
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(team_id, user_id)
);

CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  hackathon_id UUID REFERENCES hackathons(id),
  github_url TEXT,
  demo_url TEXT,
  mvp_url TEXT,    
  description TEXT,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);