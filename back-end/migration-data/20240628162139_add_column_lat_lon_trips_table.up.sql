BEGIN;

SET
    search_path TO tripcast;

ALTER TABLE
    trips
ADD
    COLUMN IF NOT EXISTS latitude NUMERIC,
ADD
    COLUMN IF NOT EXISTS longitude NUMERIC;

COMMIT;