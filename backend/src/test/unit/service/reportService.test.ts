jest.mock("../../../repositories/reportRepository", () => {
  const mRepo = {
    findAll: jest.fn(),
    findById: jest.fn(),
    findByStatus: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    deleteById: jest.fn(),
  };
  return { __esModule: true, default: mRepo };
});

jest.mock("../../../services/imageService", () => {
  const mImg = {
    getMultipleImages: jest.fn(),
    persistImagesForReport: jest.fn(),
    deleteImages: jest.fn(),
  };
  return { __esModule: true, default: mImg };
});

import reportService from "../../../services/reportService";
import reportRepository from "../../../repositories/reportRepository";
import imageService from "../../../services/imageService";
import { ReportStatus } from "../../../models/enums";

type RepoMock = {
  findAll: jest.Mock;
  findById: jest.Mock;
  findByStatus: jest.Mock;
  create: jest.Mock;
  update: jest.Mock;
  deleteById: jest.Mock;
};
const repo = reportRepository as unknown as RepoMock;
const imgSvc = imageService as unknown as {
  getMultipleImages: jest.Mock;
  persistImagesForReport: jest.Mock;
  deleteImages: jest.Mock;
};

const makeReport = (overrides: Partial<any> = {}) => ({
  id: 1,
  latitude: 45,
  longitude: 7,
  title: "title",
  description: "desc",
  category: "WASTE",
  photos: ["p1"],
  status: ReportStatus.ASSIGNED,
  createdAt: new Date("2025-11-04T14:30:00Z"),
  ...overrides,
});

describe("reportService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("findAll", () => {
    it("returns reports with images resolved", async () => {
      const rows = [makeReport({ id: 2 })];
      repo.findAll.mockResolvedValue(rows);
      imgSvc.getMultipleImages.mockResolvedValue(["url1"]);

      const res = await reportService.findAll();

      expect(repo.findAll).toHaveBeenCalledTimes(1);
      expect(imgSvc.getMultipleImages).toHaveBeenCalledWith(rows[0].photos);
      expect(res[0].photos).toEqual(["url1"]);
    });
  });

  describe("findById", () => {
    it("returns report with images when found", async () => {
      const row = makeReport({ id: 42 });
      repo.findById.mockResolvedValue(row);
      imgSvc.getMultipleImages.mockResolvedValue(["url42"]);

      const res = await reportService.findById(42);

      expect(repo.findById).toHaveBeenCalledWith(42);
      expect(imgSvc.getMultipleImages).toHaveBeenCalledWith(row.photos);
      expect(res).toEqual({ ...row, photos: ["url42"] });
    });

    it("returns null when not found", async () => {
      repo.findById.mockResolvedValue(null);

      const res = await reportService.findById(999);

      expect(repo.findById).toHaveBeenCalledWith(999);
      expect(res).toBeNull();
    });
  });

  describe("findByStatus", () => {
    it("maps string status to enum and returns reports with images", async () => {
      const rows = [makeReport({ id: 5, status: ReportStatus.ASSIGNED })];
      repo.findByStatus.mockResolvedValue(rows);
      imgSvc.getMultipleImages.mockResolvedValue(["u"]);

      const res = await reportService.findByStatus("ASSIGNED");

      expect(repo.findByStatus).toHaveBeenCalledWith(ReportStatus.ASSIGNED);
      expect(res[0].photos).toEqual(["u"]);
    });

    it("throws for invalid status string", async () => {
      await expect(reportService.findByStatus("BADSTATUS")).rejects.toThrow();
    });
  });

  describe("updateReportStatus", () => {
    it("updates status and returns updated status", async () => {
      const updated = { id: 1, status: ReportStatus.ASSIGNED };
      repo.update.mockResolvedValue(updated);

      const res = await reportService.updateReportStatus(1, "ASSIGNED");

      expect(repo.update).toHaveBeenCalledWith(1, {
        status: ReportStatus.ASSIGNED,
        rejectionReason: undefined,
      });
      expect(res).toBe(ReportStatus.ASSIGNED);
    });

    it("throws for invalid status", async () => {
      await expect(
        reportService.updateReportStatus(1, "BAD"),
      ).rejects.toThrow();
    });
  });

  describe("submitReport", () => {
    const baseDto = {
      latitude: 1,
      longitude: 2,
      title: "t",
      description: "d",
      category: "WASTE",
      photoKeys: ["k1"],
      anonymous: false,
    };

    it("creates report, persists images and returns report with resolved images", async () => {
      const created = { id: 10, photos: [] };
      const updated = { id: 10, photos: ["p1"] };
      repo.create.mockResolvedValue(created);
      imgSvc.persistImagesForReport.mockResolvedValue(["p1"]);
      repo.update.mockResolvedValue(updated);
      imgSvc.getMultipleImages.mockResolvedValue(["url_p1"]);

      const res = await reportService.submitReport(baseDto as any, 123);

      expect(repo.create).toHaveBeenCalledWith(
        expect.objectContaining({
          photoKeys: [],
          user_id: 123,
          status: ReportStatus.PENDING_APPROVAL,
        }),
      );
      expect(imgSvc.persistImagesForReport).toHaveBeenCalledWith(
        baseDto.photoKeys,
        created.id,
      );
      expect(repo.update).toHaveBeenCalledWith(created.id, { photos: ["p1"] });
      expect(res.photos).toEqual(["url_p1"]);
    });

    it("validates title, description and photos", async () => {
      await expect(
        reportService.submitReport({ ...baseDto, title: " " } as any, 1),
      ).rejects.toThrow("Title is required");
      await expect(
        reportService.submitReport(
          { ...baseDto, title: "t", description: " " } as any,
          1,
        ),
      ).rejects.toThrow("Description is required");
      await expect(
        reportService.submitReport(
          { ...baseDto, description: "d", photoKeys: [] } as any,
          1,
        ),
      ).rejects.toThrow("At least 1 photo is required");
      await expect(
        reportService.submitReport(
          { ...baseDto, photoKeys: ["a", "b", "c", "d"] } as any,
          1,
        ),
      ).rejects.toThrow("Maximum 3 photos are allowed");
    });
  });

  describe("deleteReport", () => {
    it("deletes existing report and removes images", async () => {
      const report = makeReport({ id: 7, photos: ["p1"] });
      const deleted = { ...report };
      repo.findById.mockResolvedValue(report);
      repo.deleteById.mockResolvedValue(deleted);
      imgSvc.deleteImages.mockResolvedValue(undefined);

      const res = await reportService.deleteReport(7);

      expect(repo.findById).toHaveBeenCalledWith(7);
      expect(repo.deleteById).toHaveBeenCalledWith(7);
      expect(imgSvc.deleteImages).toHaveBeenCalledWith(report.photos);
      expect(res.photos).toEqual([]);
      expect(res.id).toBe(7);
    });

    it("throws when report not found", async () => {
      repo.findById.mockResolvedValue(null);
      await expect(reportService.deleteReport(999)).rejects.toThrow(
        "Report not found",
      );
    });
  });
});
