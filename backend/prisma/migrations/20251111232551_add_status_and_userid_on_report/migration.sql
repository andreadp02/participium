-- AlterTable
ALTER TABLE "report" ADD COLUMN     "user_id" INTEGER,
ALTER COLUMN "status" SET DEFAULT 'PENDING_APPROVAL';

-- AddForeignKey
ALTER TABLE "report" ADD CONSTRAINT "report_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
