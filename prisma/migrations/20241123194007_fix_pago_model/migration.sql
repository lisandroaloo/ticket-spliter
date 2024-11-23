-- DropForeignKey
ALTER TABLE `Pago` DROP FOREIGN KEY `FK_Pago_us_emisor`;

-- DropForeignKey
ALTER TABLE `Pago` DROP FOREIGN KEY `FK_Pago_us_receptor`;

-- AlterTable
ALTER TABLE `Pago` MODIFY `pa_isEnviado` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `pa_isRecibido` BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE `Pago` ADD CONSTRAINT `Pago_pa_us_emisor_id_fkey` FOREIGN KEY (`pa_us_emisor_id`) REFERENCES `Usuario`(`us_email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pago` ADD CONSTRAINT `Pago_pa_us_receptor_id_fkey` FOREIGN KEY (`pa_us_receptor_id`) REFERENCES `Usuario`(`us_email`) ON DELETE RESTRICT ON UPDATE CASCADE;
