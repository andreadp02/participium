import reportRepository from '../repositories/reportRepository';
import { CreateReportDto, ReportResponseDto } from '../models/dto/reportDto';
import imageService from './imageService';
import { ReportStatus } from '../models/enums';

// Helper function to map string to ReportStatus enum
const mapStringToStatus = (status: string): ReportStatus => {
  const statusUpper = status.toUpperCase();

  if (Object.values(ReportStatus).includes(statusUpper as ReportStatus)) {
    return statusUpper as ReportStatus;
  }

  throw new Error(`Invalid status: ${status}. Valid values are: ${Object.values(ReportStatus).join(', ')}`);
};

const findAll = async (): Promise<ReportResponseDto[]> => {
  const reports = await reportRepository.findAll();

  const reportsWithImages = await Promise.all(
    reports.map(async (report) => {
      const photos = await imageService.getMultipleImages(report.photos);
      return {
        ...report,
        photos,
      };
    })
  );

  return reportsWithImages;
};

const findById = async (id: number): Promise<ReportResponseDto | null> => {
  const report = await reportRepository.findById(id);

  if (!report) {
    return null;
  }

  const photos = await imageService.getMultipleImages(report.photos);

  return {
    ...report,
    photos,
  };
};

const findByStatus = async (status: string): Promise<ReportResponseDto[]> => {
  // Map string to enum
  const statusEnum = mapStringToStatus(status);

  const reports = await reportRepository.findByStatus(statusEnum);

  if (!reports) {
    return [];
  }

  const reportsWithImages = await Promise.all(
    reports.map(async (report: any) => {
      const photos = await imageService.getMultipleImages(report.photos);
      return {
        ...report,
        photos,
      };
    })
  );

  return reportsWithImages;
};

const updateReportStatus = async (
  id: number,
  status: string,
  rejectionReason?: string
) => {

  // Map string to enum
  const statusEnum = mapStringToStatus(status);

  const updatedReport = await reportRepository.update(id, {
    status: statusEnum,
    rejectionReason: statusEnum === ReportStatus.REJECTED ? rejectionReason : undefined,
  });

  return updatedReport.status;
}

const submitReport = async (data: CreateReportDto, user_id: number): Promise<ReportResponseDto> => {
  if (!data.title || data.title.trim().length === 0) {
    throw new Error('Title is required');
  }

  if (!data.description || data.description.trim().length === 0) {
    throw new Error('Description is required');
  }

  if (!data.category) {
    throw new Error('Category is required');
  }

  if (!data.photoKeys || data.photoKeys.length < 1) {
    throw new Error('At least 1 photo is required');
  }

  if (data.photoKeys.length > 3) {
    throw new Error('Maximum 3 photos are allowed');
  }

  // Crea il report prima (senza immagini)
  const report = await reportRepository.create({
    ...data,
    photoKeys: [],
    user_id: data.anonymous ? null : user_id,
    status: ReportStatus.PENDING_APPROVAL,
  });

  const imagePaths = await imageService.persistImagesForReport(data.photoKeys, report.id);

  const updatedReport = await reportRepository.update(report.id, {
    photos: imagePaths,
  });

  const photos = await imageService.getMultipleImages(updatedReport.photos);

  return {
    ...updatedReport,
    photos,
  };
};

const deleteReport = async (id: number): Promise<ReportResponseDto> => {
  const report = await reportRepository.findById(id);

  if (!report) {
    throw new Error('Report not found');
  }

  const deletedReport = await reportRepository.deleteById(id);

  await imageService.deleteImages(report.photos);

  return {
    ...deletedReport,
    photos: [],
  };
};

export default {
  findAll,
  findById,
  findByStatus,
  submitReport,
  deleteReport,
  updateReportStatus,
};