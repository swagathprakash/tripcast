BEGIN;

SET search_path TO tripcast;

ALTER TABLE IF EXISTS notifications
ADD CONSTRAINT unique_user_id_trip_id UNIQUE(user_id,trip_id);

COMMIT;
