CREATE TABLE "recipes" (
  "id" SERIAL PRIMARY KEY,
  "title" text,
  "chef_id" int,
  "ingredients" text[],
  "preparation" text[],
  "information" text,
  "created_at" timestamp with time zone,
  "updated_at" timestamp with time zone
)

CREATE TABLE "chefs" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "file_id" int,
  "created_at" timestamp with time zone,
  "updated_at" timestamp with time zone
);

CREATE TABLE "files" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "path" text NOT NULL
);

CREATE TABLE "recipe_files" (
  "id" SERIAL PRIMARY KEY,
  "recipe_id" int,
  "file_id" int
);

ALTER TABLE "recipes" ADD FOREIGN KEY ("chef_id") REFERENCES "chefs" ("id");

ALTER TABLE "recipe_files" ADD FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id");

ALTER TABLE "recipe_files" ADD FOREIGN KEY ("file_id") REFERENCES "files" ("id");

ALTER TABLE "chefs" ADD FOREIGN KEY ("file_id") REFERENCES "files" ("id");