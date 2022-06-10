CREATE TABLE "users" (
"id" SERIAL PRIMARY KEY,
"name" TEXT NOT NULL,
"email" TEXT UNIQUE NOT NULL,
"password" TEXT NOT NULL,
"createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()    
);

CREATE TABLE "urls" (
"id" SERIAL PRIMARY KEY,
"url" TEXT NOT NULL,
"short" TEXT UNIQUE NOT NULL,
"visitCount" INTEGER NOT NULL DEFAULT 0,
"idUser" INTEGER NOT NULL REFERENCES "users"("id"),
"createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE "sessions" (
"id" SERIAL PRIMARY KEY,
"idUser" INTEGER NOT NULL REFERENCES "users"("id"),
"token" TEXT NOT NULL,
"createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);
