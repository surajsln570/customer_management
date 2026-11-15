-- AlterTable
ALTER TABLE `project` ADD COLUMN `projectAmount` INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
