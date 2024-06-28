BEGIN;

SET
    search_path TO tripcast;

ALTER TABLE
    trips DROP COLUMN IF EXISTS start_location,
    DROP COLUMN IF EXISTS destination,
    DROP COLUMN IF EXISTS start_date,
    DROP COLUMN IF EXISTS end_date,
    DROP COLUMN IF EXISTS companions,
    DROP COLUMN IF EXISTS purpose,
    DROP COLUMN IF EXISTS itinerary,
    DROP COLUMN IF EXISTS forecast,
    DROP COLUMN IF EXISTS packing_items,
    DROP COLUMN IF EXISTS safety_tips;
COMMIT;