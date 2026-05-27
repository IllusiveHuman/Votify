/*
  Warnings:

  - The values [SELF_PACED] on the enum `sessions_progressionMode` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `sessions` MODIFY `progressionMode` ENUM('MANUAL', 'AUTO') NOT NULL;
