CREATE SCHEMA IF NOT EXISTS xdhome;

CREATE TABLE IF NOT EXISTS xdhome.baby_records (
  id SERIAL PRIMARY KEY,
  rec_type VARCHAR(20) NOT NULL,
  data VARCHAR(511) NOT NULL,
  created_at timestamp default now()
);