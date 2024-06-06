-- CreateTable
CREATE TABLE `job_urls` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(50) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `job_urls_url_key`(`url`),
    INDEX `job_urls_url_idx`(`url`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `keyword_counts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `count` INTEGER NOT NULL,
    `refined_keyword_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `keyword_counts_refined_keyword_id_fkey`(`refined_keyword_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `keyword_groups` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `platforms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
    `last_id` VARCHAR(20) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `raw_keywords` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
    `refined_keyword_id` INTEGER NOT NULL,

    INDEX `raw_keywords_name_idx`(`name`),
    INDEX `raw_keywords_refined_keyword_id_fkey`(`refined_keyword_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `refined_keywords` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
    `is_active` TINYINT NOT NULL DEFAULT 1,

    UNIQUE INDEX `refined_keywords_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `refined_keywords_on_job_url` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `refined_keyword_id` INTEGER NOT NULL,
    `job_url_id` INTEGER NOT NULL,

    INDEX `refined_keywords_on_job_url_job_url_id_fkey`(`job_url_id`),
    UNIQUE INDEX `refined_keywords_on_job_url_refined_keyword_id_job_url_id_key`(`refined_keyword_id`, `job_url_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `refined_keywords_on_keyword_groups` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `refined_keyword_id` INTEGER NOT NULL,
    `keyword_group_id` INTEGER NOT NULL,

    INDEX `refined_keywords_on_keyword_groups_keyword_group_id_fkey`(`keyword_group_id`),
    INDEX `refined_keywords_on_keyword_groups_refined_keyword_id_fkey`(`refined_keyword_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `keyword_counts` ADD CONSTRAINT `keyword_counts_refined_keyword_id_fkey` FOREIGN KEY (`refined_keyword_id`) REFERENCES `refined_keywords`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `raw_keywords` ADD CONSTRAINT `raw_keywords_refined_keyword_id_fkey` FOREIGN KEY (`refined_keyword_id`) REFERENCES `refined_keywords`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `refined_keywords_on_job_url` ADD CONSTRAINT `refined_keywords_on_job_url_job_url_id_fkey` FOREIGN KEY (`job_url_id`) REFERENCES `job_urls`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `refined_keywords_on_job_url` ADD CONSTRAINT `refined_keywords_on_job_url_refined_keyword_id_fkey` FOREIGN KEY (`refined_keyword_id`) REFERENCES `refined_keywords`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `refined_keywords_on_keyword_groups` ADD CONSTRAINT `refined_keywords_on_keyword_groups_keyword_group_id_fkey` FOREIGN KEY (`keyword_group_id`) REFERENCES `keyword_groups`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `refined_keywords_on_keyword_groups` ADD CONSTRAINT `refined_keywords_on_keyword_groups_refined_keyword_id_fkey` FOREIGN KEY (`refined_keyword_id`) REFERENCES `refined_keywords`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

