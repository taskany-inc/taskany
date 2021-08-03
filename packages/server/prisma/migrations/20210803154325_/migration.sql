-- CreateTable
CREATE TABLE "assets" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "creatorId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "assets.key_unique" ON "assets"("key");

-- AddForeignKey
ALTER TABLE "assets" ADD FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
