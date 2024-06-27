BEGIN;

SET
    search_path TO tripcast;

CREATE TABLE
    IF NOT EXISTS notifications (
        notification_id BIGSERIAL PRIMARY KEY,
        content TEXT,
        trip_id BIGINT REFERENCES trips (trip_id),
        user_id BIGINT REFERENCES users (user_id)
    );

COMMIT;
