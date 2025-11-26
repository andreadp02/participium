import { prisma } from "@database";
import {
  NotificationDto,
  mapPrismaNotificationToDto,
} from "@dto/NotificationDTO";
import {
  buildParamsObject,
  findOrThrowNotFound,
  throwBadRequestIfMissingObject,
} from "@utils";

export const notificationRepository = {
  /**
   * Create a notification for a single user.
   * Validates required params and returns the created NotificationDto.
   */
  async create(
    title: string,
    content: string,
    report: number,
    user: number,
    createdAt?: Date,
    readAt?: Date | null,
  ): Promise<NotificationDto> {
    throwBadRequestIfMissingObject(
      buildParamsObject(
        { title, content, user, report },
        { createdAt, readAt },
      ),
    );

    const n = await prisma.notification.create({
      data: {
        title,
        content,
        report: { connect: { id: report } },
        user: { connect: { id: user } },
        created_at: createdAt,
        read_at: readAt,
      },
      include: {
        report: true,
        user: true,
      },
    });

    return mapPrismaNotificationToDto(n);
  },

  /**
   * Find notifications for a given user (most recent first).
   */
  async findByUserId(userId: number): Promise<NotificationDto[]> {
    const rows = await prisma.notification.findMany({
      where: { user_id: userId },
      include: {
        report: true,
        user: true,
      },
      orderBy: { created_at: "desc" },
    });

    return rows.map((r) => mapPrismaNotificationToDto(r));
  },

  /**
   * Get a notification by id (returns NotificationDto or throws).
   */
  async findById(id: number): Promise<NotificationDto> {
    const row = await prisma.notification.findUnique({
      where: { id },
      include: {
        report: true,
        user: true,
      },
    });

    findOrThrowNotFound(
      [row],
      () => !!row,
      `Notification with id ${id} not found`,
    );

    return mapPrismaNotificationToDto(row);
  },

  /**
   * Mark a notification (single-user row) as read and return the updated notification.
   */
  async markAsRead(id: number): Promise<NotificationDto> {
    await this.findByUserId(id); // ensure exists

    const updated = await prisma.notification.update({
      where: { id },
      data: { read_at: new Date() },
      include: {
        report: true,
        user: true,
      },
    });

    return mapPrismaNotificationToDto(updated);
  },
};
