-- AlterTable
ALTER TABLE "report" ADD COLUMN     "rejectionReason" TEXT;

ALTER TABLE "report" ADD CONSTRAINT report_rejection_reason_check CHECK (
(status = 'REJECTED' AND "rejectionReason" IS NOT NULL) OR
(status <> 'REJECTED' AND "rejectionReason" IS NULL)
);