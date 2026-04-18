-- CreateEnum
CREATE TYPE "CalculatorGroupType" AS ENUM ('required', 'extra');

-- CreateTable
CREATE TABLE "CalculatorServiceType" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "basePrice" INTEGER NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CalculatorServiceType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CalculatorGroup" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "CalculatorGroupType" NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CalculatorGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CalculatorOption" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "price" INTEGER NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "groupId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CalculatorOption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CalculatorServiceType_slug_key" ON "CalculatorServiceType"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "CalculatorGroup_slug_key" ON "CalculatorGroup"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "CalculatorOption_slug_key" ON "CalculatorOption"("slug");

-- AddForeignKey
ALTER TABLE "CalculatorOption" ADD CONSTRAINT "CalculatorOption_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "CalculatorGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
