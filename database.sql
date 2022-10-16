
-- *** Create a database named "book_snoop" ***
-- *** Insert the following tables into the database ***

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "libraries" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "users",
    "address_id" INT REFERENCES "addresses",
    "condition" VARCHAR (20),
    "book_id" INT REFERENCES "saved_books"
);

CREATE TABLE "wishlists" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "users",
    "book_id" INT REFERENCES "saved_books"
);

CREATE TABLE "saved_books" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR (255),
    "author" VARCHAR (255),
    "isbn" VARCHAR (255) UNIQUE NOT NULL,
    "edition" VARCHAR (255),
    "cover" VARCHAR (255),
    "publisher" VARCHAR (255),
    "year" VARCHAR (255)
);

CREATE TABLE "addresses" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (255) NOT NULL,
    "street_address" VARCHAR (255) NOT NULL,
    "city" VARCHAR (255) NOT NULL,
    "state" VARCHAR (255) NOT NULL,
    "zip" VARCHAR (16) NOT NULL,
    "googleMaps_placeId" VARCHAR (255) UNIQUE NOT NULL
);