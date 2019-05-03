CREATE TABLE capstone1_meals (
  id SERIAL PRIMARY KEY,
  image TEXT,
  meal_name TEXT NOT NULL,
  ingredients TEXT,
  date_created TIMESTAMP DEFAULT now() NOT NULL,
  on_day INTEGER, -- SHOULD BE DATE INSTEAD BUT I'LL HACK IT FOR NOW
  bookmarked BOOLEAN
);

--CREATE TABLE capstone1_calendar (

--)