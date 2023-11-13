CREATE SCHEMA IF NOT EXISTS app;

CREATE TABLE IF NOT EXISTS app.baby_records (
  id SERIAL PRIMARY KEY,
  rec_type VARCHAR(20) NOT NULL,
  data VARCHAR(511) NOT NULL,
  created_at timestamp default now()
);
