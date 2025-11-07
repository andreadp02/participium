import React, { useState } from "react";
import { X } from "lucide-react";
import { Report } from "src/services/models";

const ReportForm: React.FC<{
  lat: number;
  lng: number;
  onClose?: () => void;
}> = ({ lat, lng, onClose }) => {
  const [formData, setFormData] = useState<Report>(
    new Report(lat, lng, "", "PENDING"),
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async () => {
    setLoading(true);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 animate-in fade-in duration-300 relative">
        {/* Close button (top-right) */}
        <button
          type="button"
          aria-label="Close"
          onClick={() => onClose?.()}
          className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
        >
          <span className="sr-only">Close</span>
          <X />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="mt-5 text-2xl font-extrabold text-slate-900">
            New Report
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Submit a short description of the issue at the selected location.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Error Message */}
          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Title / Description */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1 !w-full items-start justify-center ">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Title
              </label>
              <div className="relative w-full">
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Short title"
                  required
                  className="pl-9 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm shadow-sm bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 !w-full items-start justify-center ">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Description
              </label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the issue"
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm shadow-sm bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onClose?.()}
              className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-xl bg-gradient-to-r from-indigo-600 to-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-indigo-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send Report"}
            </button>
          </div>

          {/* TODO: remove it after testing */}
          <div className="mt-3 text-xs text-slate-500">
            Position: {lat.toFixed(5)}, {lng.toFixed(5)}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportForm;
