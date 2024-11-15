/*
  Warnings:

  - The primary key for the `UsuarioXTicket` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `UsuarioXTicket` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`uxt_us_id`, `uxt_ti_id`);
