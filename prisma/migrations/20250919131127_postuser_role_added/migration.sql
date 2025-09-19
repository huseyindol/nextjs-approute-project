-- CreateEnum
CREATE TYPE "public"."PostRole" AS ENUM ('AUTHOR', 'EDITOR', 'ADMIN', 'CONTRIBUTOR');

-- AlterTable
ALTER TABLE "public"."PostUser" ADD COLUMN     "role" "public"."PostRole" NOT NULL DEFAULT 'AUTHOR';
