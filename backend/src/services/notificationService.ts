import {
  NotificationDto,
  CreateNotificationDto,
  buildNotificationDto,
} from "@dto/NotificationDTO";
import { notificationRepository } from "@repositories/notificationRepository";
import reportService from "@services/reportService";
import { userService } from "@services/userService";

import { NotFoundError } from "@errors/NotFoundError";
import { ForbiddenError } from "@errors/ForbiddenError";

export const notificationService = {
  /**
   * Send a notification to a user regarding a report.
   */
  async sendNotification(
    data: CreateNotificationDto,
    reportId: number,
    userId: number
  ): Promise<NotificationDto> {
    const report = await reportService.findById(reportId);
    if (!report) throw new NotFoundError("Report not found");

    const user = await userService.getUserById(userId);
    if (!user) throw new NotFoundError("User not found");

    const notification = await notificationRepository.create(
      data.title,
      data.content,
      reportId,
      userId,
      data.createdAt,
      data.readAt
    );

    return buildNotificationDto(notification);
  },

  /**
   * Notify a user about a change in the status of a report.
   */
  async notifyReportStatusChange(
    reportId: number,
    oldStatus: string | null,
    newStatus: string,
    userId: number
  ): Promise<NotificationDto> {
    const title = `Report status updated: ${newStatus}`;
    const content = `The report "${reportId}" changed status ${
      oldStatus ? ` from ${oldStatus}` : ""
    } to ${newStatus}.`;

    const dto: CreateNotificationDto = {
      title,
      content,
      createdAt: new Date(),
      readAt: null,
    };

    const notification = await this.sendNotification(dto, reportId, userId);

    return buildNotificationDto(notification);
  },

  /**
   * Get notifications for a user.
   */
  async getNotificationsForUser(userId: number): Promise<NotificationDto[]> {
    const user = await userService.getUserById(userId);
    if (!user) throw new NotFoundError("User not found");

    const notifications = await notificationRepository.findByUserId(userId);
    return notifications.map((n) => buildNotificationDto(n));
  },

  /**
   * Get a notification by id.
   */
  async getNotificationById(id: number): Promise<NotificationDto> {
    const notification = await notificationRepository.findById(id);
    return buildNotificationDto(notification);
  },

  /**
   * Mark a notification as read.
   */
  async markNotificationAsRead(
    id: number,
    userId: number
  ): Promise<NotificationDto> {
    const notification = await this.getNotificationById(id); // ensure exists

    if (notification.user.id !== userId)
      throw new ForbiddenError(
        "Not authorized to mark this notification as read"
      );

    const updatedNotification = await notificationRepository.markAsRead(id);
    return buildNotificationDto(updatedNotification);
  },
};
