BEGIN;

SET
    search_path TO tripcast;

CREATE TABLE
    IF NOT EXISTS trips (
        trip_id BIGSERIAL PRIMARY KEY,
        user_id BIGINT REFERENCES users(user_id)
    );

COMMIT;
