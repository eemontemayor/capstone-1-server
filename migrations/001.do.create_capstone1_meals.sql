CREATE TABLE capstone1_meals (
  id SERIAL PRIMARY KEY,
  image TEXT,
  meal_name TEXT NOT NULL,
  ingredients TEXT,
  date_created TIMESTAMP DEFAULT now() NOT NULL
  --on_day TIMESTAMP

);

--CREATE TABLE capstone1_calendar (

--)