-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "username" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "role_id" INTEGER NOT NULL DEFAULT 2
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_idx" ON "users"("email");
