import axios from "axios";

// ==================== Types ====================

export type ReportCategory =
  | "Water Supply – Drinking Water"
  | "Architectural Barriers"
  | "Sewer System"
  | "Public Lighting"
  | "Waste"
  | "Road Signs and Traffic Lights"
  | "Roads and Urban Furnishings"
  | "Public Green Areas and Playgrounds"
  | "Other";

export interface UserRegistration {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface User {
  firstName?: string;
  lastName?: string;
  username?: string;
}

export interface LoginRequest {
  identifier: string; // username or email
  password: string;
}

// export interface ReportRequest {
//   title: string;
//   description: string;
//   anonymous: boolean;
//   category: ReportCategory;
//   photos: File[]; // 1-3 photos
// }

export interface Report {
  id?: number;
  title?: string;
  description?: string;
  anonymous?: boolean;
  category?: ReportCategory;
  photos?: string[]; // URLs
  createdAt?: string;
}

export interface ApiError {
  error: string;
  message: string;
}

// ==================== API Instance ====================

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
  withCredentials: true, // Important: enables cookies for authentication
});

// ==================== Authentication APIs ====================

/**
 * Register a new user
 * @returns User data on success
 * @throws ApiError on failure
 */
export const register = async (userData: UserRegistration): Promise<User> => {
  const response = await api.post("/users", userData);
  return response.data;
};

/**
 * Login with username/email and password
 * @returns User data on success
 * @throws ApiError on failure
 */
export const login = async (credentials: LoginRequest): Promise<User> => {
  const response = await api.post("/auth/session", credentials);
  return response.data;
};

/**
 * Verify if the user is authenticated
 * @returns User data if authenticated
 * @throws ApiError if not authenticated
 */
export const verifyAuth = async (): Promise<User> => {
  const response = await api.get("/auth/session");
  return response.data;
};

/**
 * Logout (client-side - clears cookie)
 * Note: You may need to implement a logout endpoint on the backend
 */
export const logout = async (): Promise<void> => {
  await api.delete("/auth/session");
};

// ==================== Report APIs ====================

/**
 * Create a new report with photos (multipart/form-data)
 * @param formData FormData containing report data and photos
 * @returns Created report
 * @throws ApiError on failure
 */
export const createReport = async (formData: FormData): Promise<Report> => {
  const response = await api.post("/reports", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

/**
 * Get all reports
 * @returns Array of reports
 * @throws ApiError on failure
 */
export const getReports = async (): Promise<Report[]> => {
  const response = await api.get("/reports");
  return response.data;
};

/**
 * Get user's own reports
 * @returns Array of reports
 * @throws ApiError on failure
 */
export const getMyReports = async (): Promise<Report[]> => {
  const response = await api.get("/reports/my");
  return response.data;
};

export default api;
