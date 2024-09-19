/*
  Warnings:

  - Added the required column `pa_pr_id` to the `Pago` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pago` ADD COLUMN `pa_pr_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Pago` ADD CONSTRAINT `Pago_pa_pr_id_fkey` FOREIGN KEY (`pa_pr_id`) REFERENCES `Proyecto`(`pr_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
