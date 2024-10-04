-- CreateTable
CREATE TABLE `Usuario` (
    `us_email` VARCHAR(191) NOT NULL,
    `us_nombre` VARCHAR(191) NOT NULL,
    `us_password` VARCHAR(191) NOT NULL,
    `us_estado` VARCHAR(191) NOT NULL,
    `us_role` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`us_email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pago` (
    `pa_id` INTEGER NOT NULL AUTO_INCREMENT,
    `pa_us_emisor_id` VARCHAR(191) NOT NULL,
    `pa_us_receptor_id` VARCHAR(191) NOT NULL,
    `pa_monto` DOUBLE NOT NULL,
    `pa_fecha` DATETIME(3) NOT NULL,
    `pa_estado` VARCHAR(191) NOT NULL,
    `pa_pr_id` INTEGER NOT NULL,

    PRIMARY KEY (`pa_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Proyecto` (
    `pr_id` INTEGER NOT NULL AUTO_INCREMENT,
    `pr_nombre` VARCHAR(191) NOT NULL,
    `pr_descripcion` VARCHAR(191) NULL,

    PRIMARY KEY (`pr_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UsuarioXProyecto` (
    `uxp_us_id` VARCHAR(191) NOT NULL,
    `uxp_pr_id` INTEGER NOT NULL,
    `uxp_porcentaje` DOUBLE NOT NULL,

    PRIMARY KEY (`uxp_us_id`, `uxp_pr_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ticket` (
    `ti_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ti_pr_id` INTEGER NOT NULL,
    `ti_us_id` VARCHAR(191) NOT NULL,
    `ti_monto` DOUBLE NOT NULL,
    `ti_descripcion` VARCHAR(191) NOT NULL,
    `ti_fecha` DATETIME(3) NOT NULL,

    PRIMARY KEY (`ti_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pago` ADD CONSTRAINT `Pago_pa_pr_id_fkey` FOREIGN KEY (`pa_pr_id`) REFERENCES `Proyecto`(`pr_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pago` ADD CONSTRAINT `Pago_pa_us_emisor_id_fkey` FOREIGN KEY (`pa_us_emisor_id`) REFERENCES `Usuario`(`us_email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pago` ADD CONSTRAINT `Pago_pa_us_receptor_id_fkey` FOREIGN KEY (`pa_us_receptor_id`) REFERENCES `Usuario`(`us_email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsuarioXProyecto` ADD CONSTRAINT `UsuarioXProyecto_uxp_us_id_fkey` FOREIGN KEY (`uxp_us_id`) REFERENCES `Usuario`(`us_email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsuarioXProyecto` ADD CONSTRAINT `UsuarioXProyecto_uxp_pr_id_fkey` FOREIGN KEY (`uxp_pr_id`) REFERENCES `Proyecto`(`pr_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_ti_pr_id_fkey` FOREIGN KEY (`ti_pr_id`) REFERENCES `Proyecto`(`pr_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_ti_us_id_fkey` FOREIGN KEY (`ti_us_id`) REFERENCES `Usuario`(`us_email`) ON DELETE RESTRICT ON UPDATE CASCADE;
