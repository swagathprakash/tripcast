BEGIN;

SET
    search_path TO tripcast;

ALTER TABLE notifications
DROP COLUMN IF EXISTS is_read,
DROP COLUMN IF EXISTS created_at;

COMMIT;
