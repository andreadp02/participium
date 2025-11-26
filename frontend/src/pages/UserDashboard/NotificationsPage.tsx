import React, { useState } from "react";
import { DashboardLayout } from "../../components/dashboard/DashboardLayout";
import { motion } from "framer-motion";
import {
  Bell,
  MessageSquare,
  CheckCircle2,
  XCircle,
  Clock,
  Send,
  Info,
} from "lucide-react";

interface Notification {
  id: number;
  reportId: string;
  reportTitle: string;
  type: "status_change" | "message" | "info";
  status?: string;
  message?: string;
  sender?: string;
  timestamp: string;
  read: boolean;
}

interface Message {
  id: number;
  reportId: string;
  reportTitle: string;
  sender: string;
  senderRole: "citizen" | "municipality";
  content: string;
  timestamp: string;
  read: boolean;
}

export const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      reportId: "RPT-001",
      reportTitle: "Broken streetlight near Via Garibaldi",
      type: "status_change",
      status: "ASSIGNED",
      timestamp: "2025-11-25 14:30",
      read: false,
    },
    {
      id: 2,
      reportId: "RPT-002",
      reportTitle: "Overflowing trash bin",
      type: "message",
      message: "We are scheduling the intervention for next Monday.",
      sender: "Environmental Services",
      timestamp: "2025-11-25 10:15",
      read: false,
    },
    {
      id: 3,
      reportId: "RPT-001",
      reportTitle: "Broken streetlight near Via Garibaldi",
      type: "status_change",
      status: "IN_PROGRESS",
      timestamp: "2025-11-24 16:45",
      read: true,
    },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      reportId: "RPT-002",
      reportTitle: "Overflowing trash bin",
      sender: "Environmental Services",
      senderRole: "municipality",
      content: "We are scheduling the intervention for next Monday.",
      timestamp: "2025-11-25 10:15",
      read: false,
    },
  ]);

  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"notifications" | "messages">("notifications");

  const unreadNotifications = notifications.filter((n) => !n.read).length;
  const unreadMessages = messages.filter((m) => !m.read).length;

  const markAsRead = (notificationId: number) => {
    setNotifications(
      notifications.map((n) =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
  };

  const markMessageAsRead = (messageId: number) => {
    setMessages(
      messages.map((m) => (m.id === messageId ? { ...m, read: true } : m))
    );
  };

  const handleSendReply = (reportId: string) => {
    if (replyMessage.trim()) {
      // TODO: Send message to API
      console.log("Sending reply to", reportId, ":", replyMessage);
      setReplyMessage("");
      setSelectedReport(null);
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "ASSIGNED":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case "IN_PROGRESS":
        return <Clock className="h-5 w-5 text-blue-600" />;
      case "RESOLVED":
        return <CheckCircle2 className="h-5 w-5 text-emerald-600" />;
      case "REJECTED":
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Info className="h-5 w-5 text-slate-600" />;
    }
  };

  const getStatusLabel = (status?: string) => {
    switch (status) {
      case "ASSIGNED":
        return "Assigned to Technical Office";
      case "IN_PROGRESS":
        return "Work in Progress";
      case "RESOLVED":
        return "Issue Resolved";
      case "REJECTED":
        return "Report Rejected";
      default:
        return status;
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "ASSIGNED":
        return "from-green-50 to-emerald-50 border-green-200";
      case "IN_PROGRESS":
        return "from-blue-50 to-indigo-50 border-blue-200";
      case "RESOLVED":
        return "from-emerald-50 to-teal-50 border-emerald-200";
      case "REJECTED":
        return "from-red-50 to-rose-50 border-red-200";
      default:
        return "from-slate-50 to-gray-50 border-slate-200";
    }
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
        <div className="border-b-2 border-slate-200">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab("notifications")}
              className={`relative px-6 py-3 text-sm font-bold transition-all ${
                activeTab === "notifications"
                  ? "text-indigo-700 border-b-3 border-indigo-600"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notifications
                {unreadNotifications > 0 && (
                  <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-2 rounded-full text-xs font-bold bg-red-500 text-white">
                    {unreadNotifications}
                  </span>
                )}
              </span>
              {activeTab === "notifications" && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-t-full"></div>
              )}
            </button>

            <button
              onClick={() => setActiveTab("messages")}
              className={`relative px-6 py-3 text-sm font-bold transition-all ${
                activeTab === "messages"
                  ? "text-indigo-700 border-b-3 border-indigo-600"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Messages
                {unreadMessages > 0 && (
                  <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-2 rounded-full text-xs font-bold bg-red-500 text-white">
                    {unreadMessages}
                  </span>
                )}
              </span>
              {activeTab === "messages" && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-t-full"></div>
              )}
            </button>
          </div>
        </div>

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <div className="space-y-3">
            {notifications.length === 0 ? (
              <div className="rounded-2xl border-2 border-slate-200 bg-white p-12 text-center">
                <Bell className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <p className="text-lg font-semibold text-slate-600">
                  No notifications yet
                </p>
                <p className="text-sm text-slate-500 mt-2">
                  You'll receive updates when there are changes to your reports
                </p>
              </div>
            ) : (
              notifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => markAsRead(notification.id)}
                  className={`rounded-2xl border-2 bg-gradient-to-br overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
                    notification.read
                      ? "border-slate-200 from-white to-slate-50/30 opacity-75"
                      : "border-indigo-200 from-white to-indigo-50/30 shadow-md"
                  }`}
                >
                  <div className="p-5">
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex items-center justify-center w-12 h-12 rounded-xl shadow-md flex-shrink-0 ${
                          notification.type === "status_change"
                            ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white"
                            : "bg-gradient-to-br from-purple-500 to-pink-600 text-white"
                        }`}
                      >
                        {notification.type === "status_change" ? (
                          getStatusIcon(notification.status)
                        ) : (
                          <MessageSquare className="h-6 w-6" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex-1">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wide">
                              Report {notification.reportId}
                            </p>
                            <h3 className="text-base font-bold text-slate-900 mt-1">
                              {notification.reportTitle}
                            </h3>
                          </div>
                          {!notification.read && (
                            <div className="w-3 h-3 rounded-full bg-red-500 flex-shrink-0 mt-1"></div>
                          )}
                        </div>

                        {notification.type === "status_change" && (
                          <div
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border-2 bg-gradient-to-br ${getStatusColor(
                              notification.status
                            )}`}
                          >
                            {getStatusIcon(notification.status)}
                            <span className="text-sm font-bold text-slate-900">
                              {getStatusLabel(notification.status)}
                            </span>
                          </div>
                        )}

                        {notification.type === "message" && (
                          <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4 mt-2">
                            <p className="text-sm font-semibold text-purple-900 mb-1">
                              Message from {notification.sender}
                            </p>
                            <p className="text-sm text-purple-800">
                              {notification.message}
                            </p>
                          </div>
                        )}

                        <p className="text-xs text-slate-500 mt-3">
                          {notification.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === "messages" && (
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="rounded-2xl border-2 border-slate-200 bg-white p-12 text-center">
                <MessageSquare className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <p className="text-lg font-semibold text-slate-600">
                  No messages yet
                </p>
                <p className="text-sm text-slate-500 mt-2">
                  Municipal operators can send you messages about your reports
                </p>
              </div>
            ) : (
              messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => markMessageAsRead(message.id)}
                  className={`rounded-2xl border-2 bg-white overflow-hidden transition-all hover:shadow-lg ${
                    message.read
                      ? "border-slate-200 opacity-75"
                      : "border-purple-200 shadow-md"
                  }`}
                >
                  <div className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-md flex-shrink-0">
                        <MessageSquare className="h-6 w-6" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div>
                            <p className="text-sm font-bold text-purple-600 uppercase tracking-wide">
                              Report {message.reportId}
                            </p>
                            <h3 className="text-base font-bold text-slate-900 mt-1">
                              {message.reportTitle}
                            </h3>
                          </div>
                          {!message.read && (
                            <div className="w-3 h-3 rounded-full bg-red-500 flex-shrink-0 mt-1"></div>
                          )}
                        </div>

                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold">
                              {message.sender.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-purple-900">
                                {message.sender}
                              </p>
                              <p className="text-xs text-purple-700">
                                Municipal Operator
                              </p>
                            </div>
                          </div>
                          <p className="text-sm text-slate-800 leading-relaxed">
                            {message.content}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <p className="text-xs text-slate-500">
                            {message.timestamp}
                          </p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedReport(message.reportId);
                            }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors"
                          >
                            <Send className="h-4 w-4" />
                            Reply
                          </button>
                        </div>

                        {/* Reply Box */}
                        {selectedReport === message.reportId && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mt-4 p-4 bg-slate-50 rounded-xl border-2 border-slate-200"
                          >
                            <label className="block text-sm font-bold text-slate-700 mb-2">
                              Your Reply
                            </label>
                            <textarea
                              value={replyMessage}
                              onChange={(e) => setReplyMessage(e.target.value)}
                              placeholder="Type your message here..."
                              rows={3}
                              className="w-full rounded-lg border-2 border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition resize-none"
                            />
                            <div className="flex gap-2 mt-3">
                              <button
                                onClick={() =>
                                  handleSendReply(message.reportId)
                                }
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold transition-colors"
                              >
                                <Send className="h-4 w-4" />
                                Send Reply
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedReport(null);
                                  setReplyMessage("");
                                }}
                                className="px-4 py-2 rounded-lg border-2 border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default NotificationsPage;
