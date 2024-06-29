BEGIN;

SET
    search_path TO tripcast;

ALTER TABLE notifications
ADD
    COLUMN IF NOT EXISTS weather_change json;

COMMIT;