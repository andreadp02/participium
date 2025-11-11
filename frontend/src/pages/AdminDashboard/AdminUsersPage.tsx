import React, { useState } from "react";
import { AdminDashboardLayout } from "../../components/dashboard/AdminDashboardLayout";
import { motion } from "framer-motion";
import { Plus, Shield, UserCog, Search } from "lucide-react";
import { createPortal } from "react-dom";

interface MunicipalityUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  office: string;
  status: "active" | "inactive";
  createdAt: string;
}

const initialUsers: MunicipalityUser[] = [
  {
    id: 1,
    firstName: "Giulia",
    lastName: "Bianchi",
    email: "giulia.bianchi@comune.torino.it",
    role: "Municipal Administrator",
    office: "Urban Planning",
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    firstName: "Marco",
    lastName: "Rossi",
    email: "marco.rossi@comune.torino.it",
    role: "Technical Staff",
    office: "Public Works",
    status: "active",
    createdAt: "2024-03-20",
  },
  {
    id: 3,
    firstName: "Sara",
    lastName: "Verdi",
    email: "sara.verdi@comune.torino.it",
    role: "Public Relations Officer",
    office: "Citizen Relations",
    status: "active",
    createdAt: "2024-05-10",
  },
  {
    id: 4,
    firstName: "Luca",
    lastName: "Ferrari",
    email: "luca.ferrari@comune.torino.it",
    role: "Technical Staff",
    office: "Environmental Services",
    status: "active",
    createdAt: "2024-07-01",
  },
  {
    id: 5,
    firstName: "Elena",
    lastName: "Colombo",
    email: "elena.colombo@comune.torino.it",
    role: "Municipal Administrator",
    office: "Transportation",
    status: "inactive",
    createdAt: "2023-11-12",
  },
];

const roles = [
  "Municipal Administrator",
  "Technical Staff",
  "Public Relations Officer",
];

export const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState(initialUsers);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState<MunicipalityUser | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    office: "",
    role: "Technical Staff",
  });

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const nextId = Math.max(...users.map((u) => u.id)) + 1;
    setUsers([
      ...users,
      {
        id: nextId,
        ...newUser,
        status: "active" as const,
        createdAt: new Date().toISOString().split("T")[0],
      },
    ]);
    setNewUser({
      firstName: "",
      lastName: "",
      email: "",
      office: "",
      role: "Technical Staff",
    });
    setShowAddModal(false);
  };

  const handleEditUser = (user: MunicipalityUser) => {
    setEditingUser(user);
    setShowEditModal(true);
  };

  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      setUsers(users.map((u) => (u.id === editingUser.id ? editingUser : u)));
      setShowEditModal(false);
      setEditingUser(null);
    }
  };

  const toggleUserStatus = (id: number) => {
    setUsers(
      users.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "active" ? "inactive" : "active" }
          : u,
      ),
    );
  };

  // Filter users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      `${user.firstName} ${user.lastName} ${user.email} ${user.office}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    const matchesRole = !filterRole || user.role === filterRole;
    const matchesStatus = !filterStatus || user.status === filterStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const activeUsersCount = users.filter((u) => u.status === "active").length;
  const inactiveUsersCount = users.filter(
    (u) => u.status === "inactive",
  ).length;

  return (
    <AdminDashboardLayout>
      <div className="space-y-6 w-full max-w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Shield className="h-6 w-6 text-indigo-600" /> Municipality Users
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Manage internal municipality accounts and roles
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition"
          >
            <Plus className="h-4 w-4" /> Add User
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <p className="text-sm text-slate-600">Total Users</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">
              {users.length}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <p className="text-sm text-slate-600">Active Users</p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {activeUsersCount}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <p className="text-sm text-slate-600">Inactive Users</p>
            <p className="text-2xl font-bold text-slate-400 mt-1">
              {inactiveUsersCount}
            </p>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, email, or office..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
            />
          </div>

          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
          >
            <option value="">All Roles</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Users Table */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Name</th>
                  <th className="px-4 py-3 text-left font-semibold">Email</th>
                  <th className="px-4 py-3 text-left font-semibold">Office</th>
                  <th className="px-4 py-3 text-left font-semibold">Role</th>
                  <th className="px-4 py-3 text-left font-semibold">Status</th>
                  <th className="px-4 py-3 text-left font-semibold">Created</th>
                  <th className="px-4 py-3 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-8 text-center text-slate-500"
                    >
                      No users found matching your filters.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="border-t border-slate-100">
                      <td className="px-4 py-3 font-medium text-slate-900">
                        {user.firstName} {user.lastName}
                      </td>
                      <td className="px-4 py-3 text-slate-700">{user.email}</td>
                      <td className="px-4 py-3 text-slate-700">
                        {user.office}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center rounded-lg bg-indigo-50 border border-indigo-200 px-2.5 py-1 text-xs font-medium text-indigo-700">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                            user.status === "active"
                              ? "bg-green-50 text-green-700 border border-green-200"
                              : "bg-slate-100 text-slate-600 border border-slate-200"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {user.createdAt}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="rounded-lg border border-indigo-300 bg-indigo-50 px-2.5 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-100 transition"
                          >
                            Edit Role
                          </button>
                          <button
                            onClick={() => toggleUserStatus(user.id)}
                            className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium transition ${
                              user.status === "active"
                                ? "border-red-300 bg-red-50 text-red-700 hover:bg-red-100"
                                : "border-green-300 bg-green-50 text-green-700 hover:bg-green-100"
                            }`}
                          >
                            {user.status === "active"
                              ? "Deactivate"
                              : "Activate"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-3 text-xs text-slate-500 bg-slate-50 border-t border-slate-200">
            <span>
              Showing {filteredUsers.length} of {users.length} users
            </span>
          </div>
        </motion.div>
      </div>

      {/* Add User Modal */}
      {showAddModal &&
        createPortal(
          <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl"
            >
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
                <UserCog className="h-5 w-5 text-indigo-600" /> Add Municipality
                User
              </h2>

              <form onSubmit={handleAddUser} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="First Name"
                      value={newUser.firstName}
                      onChange={(e) =>
                        setNewUser({ ...newUser, firstName: e.target.value })
                      }
                      required
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={newUser.lastName}
                      onChange={(e) =>
                        setNewUser({ ...newUser, lastName: e.target.value })
                      }
                      required
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email@comune.torino.it"
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                    required
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Office <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Public Works"
                    value={newUser.office}
                    onChange={(e) =>
                      setNewUser({ ...newUser, office: e.target.value })
                    }
                    required
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Role <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newUser.role}
                    onChange={(e) =>
                      setNewUser({ ...newUser, role: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                  >
                    {roles.map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition"
                  >
                    Add User
                  </button>
                </div>
              </form>
            </motion.div>
          </div>,
          document.body,
        )}

      {/* Edit Role Modal */}
      {showEditModal &&
        editingUser &&
        createPortal(
          <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl"
            >
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
                <UserCog className="h-5 w-5 text-indigo-600" /> Edit User Role
              </h2>

              <form onSubmit={handleUpdateUser} className="space-y-4">
                {/* User Info Display */}
                <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                  <p className="text-sm font-medium text-slate-900">
                    {editingUser.firstName} {editingUser.lastName}
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    {editingUser.email}
                  </p>
                  <p className="text-xs text-slate-600">{editingUser.office}</p>
                </div>

                {/* Role Selection */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Assign Role <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={editingUser.role}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, role: e.target.value })
                    }
                    required
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                  >
                    {roles.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-slate-500 mt-2">
                    Select the appropriate role for this user based on their
                    responsibilities.
                  </p>
                </div>

                {/* Role Descriptions */}
                <div className="rounded-xl bg-blue-50 border border-blue-200 p-3">
                  <p className="text-xs font-semibold text-blue-900 mb-2">
                    Role Descriptions:
                  </p>
                  <ul className="text-xs text-blue-800 space-y-1">
                    <li>
                      <strong>Municipal Administrator:</strong> Full system
                      access and user management
                    </li>
                    <li>
                      <strong>Technical Staff:</strong> Handle technical reports
                      and operations
                    </li>
                    <li>
                      <strong>Public Relations Officer:</strong> Manage citizen
                      communications
                    </li>
                  </ul>
                </div>

                <div className="flex justify-end gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditModal(false);
                      setEditingUser(null);
                    }}
                    className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>,
          document.body,
        )}
    </AdminDashboardLayout>
  );
};

export default AdminUsersPage;
