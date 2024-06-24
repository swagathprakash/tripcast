BEGIN;

CREATE TABLE IF NOT EXISTS tripcast.users (
    user_id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    mobile_number TEXT NOT NULL UNIQUE
);

COMMIT;