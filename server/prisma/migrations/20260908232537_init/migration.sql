-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `passwordHash` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `company` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Listing` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `area` VARCHAR(191) NOT NULL,
    `dimensions` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `impressions` VARCHAR(191) NOT NULL,
    `traffic` VARCHAR(191) NOT NULL,
    `availability` VARCHAR(191) NOT NULL,
    `lighting` VARCHAR(191) NOT NULL,
    `facing` VARCHAR(191) NOT NULL,
    `image` TEXT NOT NULL,
    `images` JSON NOT NULL,
    `description` TEXT NOT NULL,
    `features` JSON NOT NULL,
    `lat` DOUBLE NOT NULL,
    `lng` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Booking` (
    `id` VARCHAR(191) NOT NULL,
    `reference` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'CONFIRMED', 'PAID', 'CANCELLED', 'COMPLETED') NOT NULL DEFAULT 'PENDING',
    `startDate` DATE NOT NULL,
    `endDate` DATE NOT NULL,
    `months` INTEGER NOT NULL,
    `rental` INTEGER NOT NULL,
    `production` INTEGER NOT NULL,
    `serviceFee` INTEGER NOT NULL,
    `total` INTEGER NOT NULL,
    `campaign` VARCHAR(191) NULL,
    `artworkUrl` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `listingId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Booking_reference_key`(`reference`),
    INDEX `Booking_userId_idx`(`userId`),
    INDEX `Booking_listingId_idx`(`listingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `id` VARCHAR(191) NOT NULL,
    `bookingId` VARCHAR(191) NOT NULL,
    `reference` VARCHAR(191) NOT NULL,
    `paystackRef` VARCHAR(191) NULL,
    `status` ENUM('PENDING', 'SUCCESS', 'FAILED', 'REFUNDED') NOT NULL DEFAULT 'PENDING',
    `channel` VARCHAR(191) NULL,
    `currency` VARCHAR(191) NOT NULL DEFAULT 'NGN',
    `amount` INTEGER NOT NULL,
    `paidAt` DATETIME(3) NULL,
    `raw` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Payment_bookingId_key`(`bookingId`),
    UNIQUE INDEX `Payment_reference_key`(`reference`),
    UNIQUE INDEX `Payment_paystackRef_key`(`paystackRef`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SavedSpace` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` VARCHAR(191) NOT NULL,
    `listingId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `SavedSpace_userId_listingId_key`(`userId`, `listingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContactMessage` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `subject` VARCHAR(191) NOT NULL,
    `message` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_listingId_fkey` FOREIGN KEY (`listingId`) REFERENCES `Listing`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `Booking`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SavedSpace` ADD CONSTRAINT `SavedSpace_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SavedSpace` ADD CONSTRAINT `SavedSpace_listingId_fkey` FOREIGN KEY (`listingId`) REFERENCES `Listing`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
