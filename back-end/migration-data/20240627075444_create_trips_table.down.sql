BEGIN;

SET
    search_path TO tripcast;

DROP TABLE IF EXISTS trips;

COMMIT;
