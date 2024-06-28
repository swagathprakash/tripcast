BEGIN;

SET
    search_path TO tripcast;

ALTER TABLE
    trips DROP COLUMN IF EXISTS latitude,
    DROP COLUMN IF EXISTS longitude;

COMMIT;