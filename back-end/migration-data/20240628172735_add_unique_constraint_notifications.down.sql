BEGIN;

SET
    search_path TO tripcast;

ALTER TABLE IF EXISTS notifications
DROP CONSTRAINT unique_user_id_trip_id;

COMMIT;
