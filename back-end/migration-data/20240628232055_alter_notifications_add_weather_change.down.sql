BEGIN;

SET
    search_path TO tripcast;

ALTER TABLE
    notifications DROP COLUMN IF EXISTS weather_change;

COMMIT;