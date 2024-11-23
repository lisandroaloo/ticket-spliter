/*
  Warnings:

  - You are about to drop the column `pa_estado` on the `Pago` table. All the data in the column will be lost.
  - Added the required column `pa_isEnviado` to the `Pago` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pa_isRecibido` to the `Pago` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Pago` DROP COLUMN `pa_estado`,
    ADD COLUMN `pa_isEnviado` BOOLEAN NOT NULL,
    ADD COLUMN `pa_isRecibido` BOOLEAN NOT NULL;
