/*
  Warnings:

  - Added the required column `url` to the `assets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "assets" ADD COLUMN     "url" TEXT NOT NULL;
