import { removeNullAttributes } from "@utils";
import { UserDto } from "@dto/userDto";
import { ReportResponseDto } from "@dto/reportDto";

export interface CreateNotificationDto {
  title: string;
  content: string;
  createdAt?: Date;
  readAt?: Date | null;
}

export interface NotificationDto {
  id: number;
  title: string;
  content: string;
  report: ReportResponseDto;
  user: UserDto;
  createdAt: Date;
  readAt: Date | null;
}

export function NotificationFromJSON(json: any): NotificationDto | null {
  if (json == null) return null;
  return {
    id: json.id,
    title: json.title,
    content: json.content,
    report: json.report as ReportResponseDto,
    user: json.user as UserDto,
    createdAt: json.created_at ? new Date(json.created_at) : new Date(),
    readAt: json.read_at ? new Date(json.read_at) : null,
  };
}

/**
 * Build a NotificationDto, removing null attributes.
 */
export function buildNotificationDto(data: NotificationDto): NotificationDto {
  return removeNullAttributes({
    id: data.id,
    title: data.title,
    content: data.content,
    report: removeNullAttributes(data.report),
    user: removeNullAttributes(data.user),
    createdAt: data.createdAt,
    readAt: data.readAt,
  }) as NotificationDto;
}

/**
 * Map a Prisma notification row (with included report and user) to NotificationDto.
 * Accepts both snake_case (prisma schema) and camelCase fields.
 */
export function mapPrismaNotificationToDto(row: any): NotificationDto {
  if (!row) return null as any;
  const createdAt = row.created_at ?? row.createdAt;
  const readAt = row.read_at ?? row.readAt;
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    report: row.report as ReportResponseDto,
    user: row.user as UserDto,
    createdAt: createdAt ? new Date(createdAt) : new Date(),
    readAt: readAt ? new Date(readAt) : null,
  };
}
