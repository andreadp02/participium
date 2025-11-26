import { Router } from "express";
import {
  getNotifications,
  getNotificationById,
  markNotificationRead,
} from "@controllers/notificationController";
import { isAuthenticated } from "@middlewares/authMiddleware";

const router = Router();

// all notification routes require authentication
router.use(isAuthenticated);

/**
 * GET /api/notifications
 * - list notifications for current user
 */
router.get("/", getNotifications);

/**
 * GET /api/notifications/:id
 * - get a specific notification, only if current user can access it
 */
router.get("/:id", getNotificationById);

/**
 * PUT /api/notifications/:id/read
 * - mark  this notification as read for the current user
 */
router.put("/:id/read", markNotificationRead);

export default router;
