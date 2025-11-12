jest.mock("../../../database/connection", () => {
  const mPrisma = {
    report: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
    },
  };
  return { prisma: mPrisma };
});

import { prisma } from "../../../database/connection";
import reportRepository from "../../../repositories/reportRepository";
import { ReportStatus } from "../../../models/enums";

type PrismaMock = {
  report: {
    findMany: jest.Mock;
    findUnique: jest.Mock;
    create: jest.Mock;
    delete: jest.Mock;
    update: jest.Mock;
  };
};

const prismaMock = prisma as unknown as PrismaMock;

const makeReport = (overrides: Partial<any> = {}) => ({
  id: 1,
  latitude: 45,
  longitude: 7,
  title: "title",
  description: "desc",
  category: "WASTE",
  photoKeys: ["p1"],
  status: ReportStatus.ASSIGNED,
  createdAt: new Date("2025-11-04T14:30:00Z"),
  ...overrides,
});

describe("reportRepository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // -------- findAll --------
  describe("findAll", () => {
    it("call findAll and returns all reports", async () => {
      const rows = [makeReport({ id: 2 }), makeReport({ id: 1 })];
      prismaMock.report.findMany.mockResolvedValue(rows);

      const res = await reportRepository.findAll();

      expect(prismaMock.report.findMany).toHaveBeenCalledWith({
        orderBy: { createdAt: "desc" },
      });
      expect(res).toBe(rows);
    });
  });

  // -------- findById --------
  describe("findById", () => {
    it("return report if it exists", async () => {
      const row = makeReport({ id: 42 });
      prismaMock.report.findUnique.mockResolvedValue(row);

      const res = await reportRepository.findById(42);

      expect(prismaMock.report.findUnique).toHaveBeenCalledWith({
        where: { id: 42 },
      });
      expect(res).toBe(row);
    });

    it("return null if the report does not exists", async () => {
      prismaMock.report.findUnique.mockResolvedValue(null);

      const res = await reportRepository.findById(999);
      expect(res).toBeNull();
    });
  });

  // -------- findByStatus --------
  describe("findByStatus", () => {
    it("returns reports filtered by status", async () => {
      const rows = [makeReport({ id: 5, status: ReportStatus.ASSIGNED })];
      prismaMock.report.findMany.mockResolvedValue(rows);

      const res = await reportRepository.findByStatus(
        ReportStatus.ASSIGNED as any,
      );

      expect(prismaMock.report.findMany).toHaveBeenCalledWith({
        where: { status: ReportStatus.ASSIGNED } as any,
        orderBy: { createdAt: "desc" },
      });
      expect(res).toBe(rows);
    });
  });

  // -------- create --------
  describe("create", () => {
    it("create report", async () => {
      const created = makeReport({ id: 10 });
      prismaMock.report.create.mockResolvedValue(created);

      const input = {
        latitude: 10,
        longitude: 20,
        title: "t",
        description: "d",
        category: "WASTE",
        photoKeys: ["a", "b"],
        status: ReportStatus.ASSIGNED,
      } as any;

      const res = await reportRepository.create(input);

      expect(prismaMock.report.create).toHaveBeenCalledWith({
        data: {
          latitude: input.latitude,
          longitude: input.longitude,
          title: input.title,
          description: input.description,
          category: input.category,
          photos: input.photoKeys,
          status: input.status,
        },
      });
      expect(res).toBe(created);
    });

    it("creates report with user relation when user_id provided", async () => {
      const created = makeReport({ id: 11 });
      prismaMock.report.create.mockResolvedValue(created);

      const input = {
        latitude: 1,
        longitude: 2,
        title: "t2",
        description: "d2",
        category: "OTHER",
        photoKeys: [],
        status: ReportStatus.ASSIGNED,
        user_id: 42,
      } as any;

      const res = await reportRepository.create(input);

      expect(prismaMock.report.create).toHaveBeenCalledWith({
        data: {
          latitude: input.latitude,
          longitude: input.longitude,
          title: input.title,
          description: input.description,
          category: input.category,
          photos: input.photoKeys,
          status: input.status,
          user: {
            connect: { id: input.user_id },
          },
        },
      });
      expect(res).toBe(created);

      // opzionale: controlli di shape
      expect(res).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          createdAt: expect.any(Date),
        }),
      );
    });
  });

  // -------- deleteById --------
  describe("deleteById", () => {
    it("delete the report and return the deleted report", async () => {
      const deleted = makeReport({ id: 7 });
      prismaMock.report.delete.mockResolvedValue(deleted);

      const res = await reportRepository.deleteById(7);

      expect(prismaMock.report.delete).toHaveBeenCalledWith({
        where: { id: 7 },
      });
      expect(res).toBe(deleted);
    });
  });
});
