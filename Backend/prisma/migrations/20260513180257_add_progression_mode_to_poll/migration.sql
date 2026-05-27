-- AlterTable
ALTER TABLE `polls` ADD COLUMN `progressionMode` ENUM('MANUAL', 'AUTO') NOT NULL DEFAULT 'AUTO';
