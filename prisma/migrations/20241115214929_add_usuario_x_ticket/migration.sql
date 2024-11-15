/*
  Warnings:

  - You are about to drop the column `us_role` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `uxp_porcentaje` on the `UsuarioXProyecto` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Pago` DROP FOREIGN KEY `Pago_pa_us_emisor_id_fkey`;

-- DropForeignKey
ALTER TABLE `Pago` DROP FOREIGN KEY `Pago_pa_us_receptor_id_fkey`;

-- AlterTable
ALTER TABLE `Usuario` DROP COLUMN `us_role`;

-- AlterTable
ALTER TABLE `UsuarioXProyecto` DROP COLUMN `uxp_porcentaje`;

-- CreateTable
CREATE TABLE `UsuarioXTicket` (
    `uxt_ti_id` INTEGER NOT NULL,
    `uxt_us_id` VARCHAR(191) NOT NULL,
    `uxt_porcentaje` DOUBLE NOT NULL,

    PRIMARY KEY (`uxt_ti_id`, `uxt_us_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pago` ADD CONSTRAINT `FK_Pago_us_emisor` FOREIGN KEY (`pa_us_emisor_id`) REFERENCES `Usuario`(`us_email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pago` ADD CONSTRAINT `FK_Pago_us_receptor` FOREIGN KEY (`pa_us_receptor_id`) REFERENCES `Usuario`(`us_email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsuarioXTicket` ADD CONSTRAINT `UsuarioXTicket_uxt_ti_id_fkey` FOREIGN KEY (`uxt_ti_id`) REFERENCES `Ticket`(`ti_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsuarioXTicket` ADD CONSTRAINT `UsuarioXTicket_uxt_us_id_fkey` FOREIGN KEY (`uxt_us_id`) REFERENCES `Usuario`(`us_email`) ON DELETE RESTRICT ON UPDATE CASCADE;
