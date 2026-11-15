-- DropForeignKey
ALTER TABLE `purchase` DROP FOREIGN KEY `Purchase_customerId_fkey`;

-- AlterTable
ALTER TABLE `purchase` MODIFY `customerId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Purchase` ADD CONSTRAINT `Purchase_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
