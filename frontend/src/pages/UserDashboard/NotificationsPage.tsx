import React, { useState } from "react";
import { DashboardLayout } from "../../components/dashboard/DashboardLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  MessageSquare,
  Send,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowRight,
  X,
} from "lucide-react";

// Sample data structure - will be replaced with API calls later
interface StatusNotification {
  id: number;
  reportId: number;
  reportTitle: string;
  oldStatus: string;
  newStatus: string;
  timestamp: string;
  read: boolean;
}

interface MessageNotification {
  id: number;
  reportId: number;
  reportTitle: string;
  sender: string;
  senderRole: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export const NotificationsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"status" | "messages">("status");
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);

  // Sample data - will be fetched from API
  const [statusNotifications] = useState<StatusNotification[]>([
    {
      id: 1,
      reportId: 1,
      reportTitle: "Broken streetlight on Main Street",
      oldStatus: "PENDING_APPROVAL",
      newStatus: "ASSIGNED",
      timestamp: "2025-11-30 10:30",
      read: false,
    },
    {
      id: 2,
      reportId: 2,
      reportTitle: "Pothole on Via Roma",
      oldStatus: "ASSIGNED",
      newStatus: "IN_PROGRESS",
      timestamp: "2025-11-29 15:45",
      read: true,
    },
    {
      id: 3,
      reportId: 1,
      reportTitle: "Broken streetlight on Main Street",
      oldStatus: "IN_PROGRESS",
      newStatus: "RESOLVED",
      timestamp: "2025-11-28 09:15",
      read: true,
    },
  ]);

  const [messageNotifications] = useState<MessageNotification[]>([
    {
      id: 1,
      reportId: 1,
      reportTitle: "Broken streetlight on Main Street",
      sender: "Marco Rossi",
      senderRole: "Technical Office",
      message: "We have scheduled the repair for tomorrow morning. The work should take approximately 2 hours.",
      timestamp: "2025-11-30 11:00",
      read: false,
    },
    {
      id: 2,
      reportId: 2,
      reportTitle: "Pothole on Via Roma",
      sender: "Laura Bianchi",
      senderRole: "Public Works",
      message: "Thank you for your report. We are currently assessing the situation and will provide an update soon.",
      timestamp: "2025-11-29 16:20",
      read: true,
    },
  ]);

  const unreadStatusCount = statusNotifications.filter((n) => !n.read).length;
  const unreadMessagesCount = messageNotifications.filter((m) => !m.read).length;

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      PENDING_APPROVAL: "bg-yellow-100 text-yellow-800 border-yellow-300",
      ASSIGNED: "bg-blue-100 text-blue-800 border-blue-300",
      IN_PROGRESS: "bg-indigo-100 text-indigo-800 border-indigo-300",
      RESOLVED: "bg-green-100 text-green-800 border-green-300",
      REJECTED: "bg-red-100 text-red-800 border-red-300",
      SUSPENDED: "bg-orange-100 text-orange-800 border-orange-300",
    };
    return colors[status] || "bg-gray-100 text-gray-800 border-gray-300";
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      PENDING_APPROVAL: "Pending Approval",
      ASSIGNED: "Assigned",
      IN_PROGRESS: "In Progress",
      RESOLVED: "Resolved",
      REJECTED: "Rejected",
      SUSPENDED: "Suspended",
    };
    return labels[status] || status;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "RESOLVED":
        return <CheckCircle className="h-4 w-4" />;
      case "IN_PROGRESS":
        return <Clock className="h-4 w-4" />;
      case "REJECTED":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const handleSendReply = async () => {
    if (!replyText.trim()) return;
    
    setSending(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSending(false);
    setReplyText("");
    setSelectedMessage(null);
    // Show success message
    alert("Reply sent successfully!");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 w-full max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            🔔 Notifications & Messages
          </h1>
          <p className="text-base text-slate-600">
            Stay updated on your reports and communicate with municipal services
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 overflow-hidden">
          <div className="flex border-b-2 border-slate-200">
            <button
              onClick={() => setActiveTab("status")}
              className={`flex-1 px-6 py-4 text-sm font-bold transition-all relative ${
                activeTab === "status"
                  ? "bg-indigo-50 text-indigo-700"
                  : "bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <Bell className="h-5 w-5" />
                Status Updates
                {unreadStatusCount > 0 && (
                  <span className="inline-flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full text-xs font-bold bg-red-500 text-white animate-pulse">
                    {unreadStatusCount}
                  </span>
                )}
              </span>
              {activeTab === "status" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600"
                />
              )}
            </button>

            <button
              onClick={() => setActiveTab("messages")}
              className={`flex-1 px-6 py-4 text-sm font-bold transition-all relative ${
                activeTab === "messages"
                  ? "bg-indigo-50 text-indigo-700"
                  : "bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Messages
                {unreadMessagesCount > 0 && (
                  <span className="inline-flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full text-xs font-bold bg-red-500 text-white animate-pulse">
                    {unreadMessagesCount}
                  </span>
                )}
              </span>
              {activeTab === "messages" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600"
                />
              )}
            </button>
          </div>

          <div className="p-6">
            <AnimatePresence mode="wait">
              {/* Status Updates Tab */}
              {activeTab === "status" && (
                <motion.div
                  key="status"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  {statusNotifications.length === 0 ? (
                    <div className="text-center py-12">
                      <Bell className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                      <p className="text-lg font-semibold text-slate-600">
                        No status updates
                      </p>
                      <p className="text-sm text-slate-500 mt-2">
                        You'll be notified when your reports change status
                      </p>
                    </div>
                  ) : (
                    statusNotifications.map((notification, index) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`rounded-xl border-2 p-5 transition-all ${
                          notification.read
                            ? "bg-slate-50 border-slate-200 opacity-75"
                            : "bg-white border-indigo-200 shadow-md"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <span className="text-sm font-bold text-indigo-600">
                                Report #{notification.reportId}
                              </span>
                              {!notification.read && (
                                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                              )}
                            </div>
                            <h3 className="text-base font-bold text-slate-900 mb-3">
                              {notification.reportTitle}
                            </h3>

                            <div className="flex items-center gap-3 flex-wrap">
                              <span
                                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold border-2 ${getStatusColor(
                                  notification.oldStatus
                                )}`}
                              >
                                {getStatusIcon(notification.oldStatus)}
                                {getStatusLabel(notification.oldStatus)}
                              </span>
                              <ArrowRight className="h-4 w-4 text-slate-400" />
                              <span
                                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold border-2 ${getStatusColor(
                                  notification.newStatus
                                )}`}
                              >
                                {getStatusIcon(notification.newStatus)}
                                {getStatusLabel(notification.newStatus)}
                              </span>
                            </div>

                            <p className="text-xs text-slate-500 mt-3">
                              {notification.timestamp}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </motion.div>
              )}

              {/* Messages Tab */}
              {activeTab === "messages" && (
                <motion.div
                  key="messages"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  {messageNotifications.length === 0 ? (
                    <div className="text-center py-12">
                      <MessageSquare className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                      <p className="text-lg font-semibold text-slate-600">
                        No messages yet
                      </p>
                      <p className="text-sm text-slate-500 mt-2">
                        Municipal staff will send you messages about your reports
                      </p>
                    </div>
                  ) : (
                    messageNotifications.map((message, index) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`rounded-xl border-2 overflow-hidden transition-all ${
                          message.read
                            ? "bg-slate-50 border-slate-200 opacity-75"
                            : "bg-white border-purple-200 shadow-md"
                        }`}
                      >
                        <div className="p-5">
                          <div className="flex items-start justify-between gap-4 mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="text-sm font-bold text-purple-600">
                                  Report #{message.reportId}
                                </span>
                                {!message.read && (
                                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                )}
                              </div>
                              <h3 className="text-base font-bold text-slate-900">
                                {message.reportTitle}
                              </h3>
                            </div>
                          </div>

                          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg p-4 mb-4">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold shadow-md">
                                {message.sender.charAt(0)}
                              </div>
                              <div>
                                <p className="text-sm font-bold text-purple-900">
                                  {message.sender}
                                </p>
                                <p className="text-xs text-purple-700">
                                  {message.senderRole}
                                </p>
                              </div>
                            </div>
                            <p className="text-sm text-slate-800 leading-relaxed">
                              {message.message}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <p className="text-xs text-slate-500">
                              {message.timestamp}
                            </p>
                            <button
                              onClick={() => setSelectedMessage(message.id)}
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold transition-all shadow-md hover:shadow-lg"
                            >
                              <Send className="h-4 w-4" />
                              Reply
                            </button>
                          </div>

                          {/* Reply Box */}
                          <AnimatePresence>
                            {selectedMessage === message.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-4 pt-4 border-t-2 border-slate-200"
                              >
                                <label className="block text-sm font-bold text-slate-700 mb-2">
                                  Your Reply
                                </label>
                                <textarea
                                  value={replyText}
                                  onChange={(e) => setReplyText(e.target.value)}
                                  placeholder="Type your message here..."
                                  rows={4}
                                  className="w-full rounded-lg border-2 border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition resize-none"
                                />
                                <div className="flex gap-2 mt-3">
                                  <button
                                    onClick={handleSendReply}
                                    disabled={sending || !replyText.trim()}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-bold transition-all shadow-md"
                                  >
                                    <Send className="h-4 w-4" />
                                    {sending ? "Sending..." : "Send Reply"}
                                  </button>
                                  <button
                                    onClick={() => {
                                      setSelectedMessage(null);
                                      setReplyText("");
                                    }}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-sm font-bold transition-all"
                                  >
                                    <X className="h-4 w-4" />
                                    Cancel
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    ))
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NotificationsPage;
