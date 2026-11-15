/*
  Warnings:

  - You are about to drop the `audit_logs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `batches` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `bill_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `bills` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `customers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `doctors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `gst_filing_periods` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `gst_ledger_entries` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `hospitals` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `locations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `manufacturers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `payments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `purchase_invoice_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `purchase_invoices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `purchase_order_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `purchase_orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `return_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `returns` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `stock_adjustments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `supplier_manufacturers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `supplier_payments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `supplier_return_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `supplier_returns` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `suppliers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `audit_logs` DROP FOREIGN KEY `audit_logs_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `batches` DROP FOREIGN KEY `batches_location_id_fkey`;

-- DropForeignKey
ALTER TABLE `batches` DROP FOREIGN KEY `batches_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `bill_items` DROP FOREIGN KEY `bill_items_batch_id_fkey`;

-- DropForeignKey
ALTER TABLE `bill_items` DROP FOREIGN KEY `bill_items_bill_id_fkey`;

-- DropForeignKey
ALTER TABLE `bill_items` DROP FOREIGN KEY `bill_items_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `bills` DROP FOREIGN KEY `bills_cashier_id_fkey`;

-- DropForeignKey
ALTER TABLE `bills` DROP FOREIGN KEY `bills_customer_id_fkey`;

-- DropForeignKey
ALTER TABLE `bills` DROP FOREIGN KEY `bills_doctor_id_fkey`;

-- DropForeignKey
ALTER TABLE `bills` DROP FOREIGN KEY `bills_hospital_id_fkey`;

-- DropForeignKey
ALTER TABLE `categories` DROP FOREIGN KEY `categories_parent_id_fkey`;

-- DropForeignKey
ALTER TABLE `gst_ledger_entries` DROP FOREIGN KEY `gst_ledger_entries_bill_id_fkey`;

-- DropForeignKey
ALTER TABLE `gst_ledger_entries` DROP FOREIGN KEY `gst_ledger_entries_purchase_invoice_id_fkey`;

-- DropForeignKey
ALTER TABLE `gst_ledger_entries` DROP FOREIGN KEY `gst_ledger_entries_return_id_fkey`;

-- DropForeignKey
ALTER TABLE `gst_ledger_entries` DROP FOREIGN KEY `gst_ledger_entries_supplier_return_id_fkey`;

-- DropForeignKey
ALTER TABLE `payments` DROP FOREIGN KEY `payments_bill_id_fkey`;

-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_manufacturer_id_fkey`;

-- DropForeignKey
ALTER TABLE `purchase_invoice_items` DROP FOREIGN KEY `purchase_invoice_items_batch_id_fkey`;

-- DropForeignKey
ALTER TABLE `purchase_invoice_items` DROP FOREIGN KEY `purchase_invoice_items_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `purchase_invoice_items` DROP FOREIGN KEY `purchase_invoice_items_purchase_invoice_id_fkey`;

-- DropForeignKey
ALTER TABLE `purchase_invoices` DROP FOREIGN KEY `purchase_invoices_purchase_order_id_fkey`;

-- DropForeignKey
ALTER TABLE `purchase_invoices` DROP FOREIGN KEY `purchase_invoices_supplier_id_fkey`;

-- DropForeignKey
ALTER TABLE `purchase_order_items` DROP FOREIGN KEY `purchase_order_items_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `purchase_order_items` DROP FOREIGN KEY `purchase_order_items_purchase_order_id_fkey`;

-- DropForeignKey
ALTER TABLE `purchase_orders` DROP FOREIGN KEY `purchase_orders_supplier_id_fkey`;

-- DropForeignKey
ALTER TABLE `return_items` DROP FOREIGN KEY `return_items_batch_id_fkey`;

-- DropForeignKey
ALTER TABLE `return_items` DROP FOREIGN KEY `return_items_return_id_fkey`;

-- DropForeignKey
ALTER TABLE `returns` DROP FOREIGN KEY `returns_bill_id_fkey`;

-- DropForeignKey
ALTER TABLE `stock_adjustments` DROP FOREIGN KEY `stock_adjustments_approved_by_id_fkey`;

-- DropForeignKey
ALTER TABLE `stock_adjustments` DROP FOREIGN KEY `stock_adjustments_batch_id_fkey`;

-- DropForeignKey
ALTER TABLE `stock_adjustments` DROP FOREIGN KEY `stock_adjustments_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `supplier_manufacturers` DROP FOREIGN KEY `supplier_manufacturers_manufacturerId_fkey`;

-- DropForeignKey
ALTER TABLE `supplier_manufacturers` DROP FOREIGN KEY `supplier_manufacturers_supplierId_fkey`;

-- DropForeignKey
ALTER TABLE `supplier_payments` DROP FOREIGN KEY `supplier_payments_purchase_invoice_id_fkey`;

-- DropForeignKey
ALTER TABLE `supplier_payments` DROP FOREIGN KEY `supplier_payments_supplier_id_fkey`;

-- DropForeignKey
ALTER TABLE `supplier_return_items` DROP FOREIGN KEY `supplier_return_items_batch_id_fkey`;

-- DropForeignKey
ALTER TABLE `supplier_return_items` DROP FOREIGN KEY `supplier_return_items_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `supplier_return_items` DROP FOREIGN KEY `supplier_return_items_supplier_return_id_fkey`;

-- DropForeignKey
ALTER TABLE `supplier_returns` DROP FOREIGN KEY `supplier_returns_purchase_invoice_id_fkey`;

-- DropForeignKey
ALTER TABLE `supplier_returns` DROP FOREIGN KEY `supplier_returns_supplier_id_fkey`;

-- DropTable
DROP TABLE `audit_logs`;

-- DropTable
DROP TABLE `batches`;

-- DropTable
DROP TABLE `bill_items`;

-- DropTable
DROP TABLE `bills`;

-- DropTable
DROP TABLE `categories`;

-- DropTable
DROP TABLE `customers`;

-- DropTable
DROP TABLE `doctors`;

-- DropTable
DROP TABLE `gst_filing_periods`;

-- DropTable
DROP TABLE `gst_ledger_entries`;

-- DropTable
DROP TABLE `hospitals`;

-- DropTable
DROP TABLE `locations`;

-- DropTable
DROP TABLE `manufacturers`;

-- DropTable
DROP TABLE `payments`;

-- DropTable
DROP TABLE `products`;

-- DropTable
DROP TABLE `purchase_invoice_items`;

-- DropTable
DROP TABLE `purchase_invoices`;

-- DropTable
DROP TABLE `purchase_order_items`;

-- DropTable
DROP TABLE `purchase_orders`;

-- DropTable
DROP TABLE `return_items`;

-- DropTable
DROP TABLE `returns`;

-- DropTable
DROP TABLE `stock_adjustments`;

-- DropTable
DROP TABLE `supplier_manufacturers`;

-- DropTable
DROP TABLE `supplier_payments`;

-- DropTable
DROP TABLE `supplier_return_items`;

-- DropTable
DROP TABLE `supplier_returns`;

-- DropTable
DROP TABLE `suppliers`;

-- DropTable
DROP TABLE `users`;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `passwordHash` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'WORKER', 'CLIENT') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Customer` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `notes` VARCHAR(191) NULL,
    `type` ENUM('VIDEOEDITING', 'JANSEVA') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NULL,
    `customerId` INTEGER NOT NULL,
    `notes` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `id` VARCHAR(191) NOT NULL,
    `type` ENUM('INCOME', 'PAYMENT') NOT NULL,
    `amount` DOUBLE NOT NULL,
    `description` VARCHAR(191) NULL,
    `category` VARCHAR(191) NULL,
    `status` ENUM('PAID', 'UNPAID') NOT NULL DEFAULT 'PAID',
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `customerId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `projectId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Expense` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `category` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
