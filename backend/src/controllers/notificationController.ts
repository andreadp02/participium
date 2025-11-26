import { Request, Response } from "express";
import { notificationService } from "@services/notificationService";
import { ForbiddenError } from "@models/errors/ForbiddenError";

export const getNotifications = async (
  req: Request,
  res: Response,
  next: Function,
) => {
  try {
    const userId = req.user!.id; // set by isAuthenticated middleware

    const notifications =
      await notificationService.getNotificationsForUser(userId);

    res.json(notifications);
  } catch (err) {
    next(err);
  }
};

export const getNotificationById = async (
  req: Request,
  res: Response,
  next: Function,
) => {
  try {
    const notificationId = Number(req.params.id);
    const userId = req.user!.id; // set by isAuthenticated middleware

    const notification =
      await notificationService.getNotificationById(notificationId);

    if (notification.user?.id === userId)
      throw new ForbiddenError("Not authorized to view this notification");

    res.json(notification);
  } catch (err) {
    next(err);
  }
};

export const markNotificationRead = async (
  req: Request,
  res: Response,
  next: Function,
) => {
  try {
    const userId = req.user!.id; // set by isAuthenticated middleware
    const notificationId = Number(req.params.id);

    const notification = await notificationService.markNotificationAsRead(
      notificationId,
      userId,
    );

    res.json(notification);
  } catch (err) {
    next(err);
  }
};
