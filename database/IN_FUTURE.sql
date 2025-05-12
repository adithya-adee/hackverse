CREATE TABLE judges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  hackathon_id UUID REFERENCES hackathons(id)
);

CREATE TABLE scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  judge_id UUID REFERENCES judges(id),
  submission_id UUID REFERENCES submissions(id),
  score INTEGER CHECK (score >= 0 AND score <= 100),
  comments TEXT
);

CREATE TABLE role_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  requested_role TEXT CHECK (requested_role IN ('organizer', 'recruiter')) NOT NULL,
  company_name TEXT NOT NULL,
  company_email TEXT NOT NULL,
  company_phone TEXT,  -- only for recruiter
  status TEXT DEFAULT 'pending',  -- pending, approved, rejected
  reviewed_by UUID REFERENCES users(id),  -- admin who approved/rejected
  reviewed_at TIMESTAMP,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);