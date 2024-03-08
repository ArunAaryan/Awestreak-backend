-- CreateTable
CREATE TABLE "Log" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "streakId" TEXT,
    "description" TEXT,
    "image" TEXT,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Log_id_key" ON "Log"("id");

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_streakId_fkey" FOREIGN KEY ("streakId") REFERENCES "Streak"("id") ON DELETE SET NULL ON UPDATE CASCADE;
