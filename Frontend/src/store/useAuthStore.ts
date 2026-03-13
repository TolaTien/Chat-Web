import { create } from "zustand";
import { axiosInstance } from "../axios/axios";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

interface User {
  _id: string;
  fullName: string;
  email: string;
  userName?: string;
  avt?: string;
  createdAt?: string;
}

interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  userName: string;
}

interface LoginData {
  email: string;
  password: string;
}

// interface UpdateProfileData {
//   fullName?: string;
//   avt?: string;
// }

interface ApiResponse {
  message: string;
  data: {
    user: User;
  };
}

interface AuthStore {
  authUser: User | null;

  isCheckingAuth: boolean;
  isRegistering: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;

  checkAuth: () => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: FormData) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  authUser: null,

  isCheckingAuth: true,
  isRegistering: false,
  isLoggingIn: false,
  isUpdatingProfile: false,

  // CHECK AUTH
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get<ApiResponse>("/check");

      set({ authUser: res.data.data.user });
    } catch (error) {
      console.log(error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // REGISTER
  register: async (data: RegisterData) => {
    set({ isRegistering: true });

    try {
      const res = await axiosInstance.post<ApiResponse>("/register", data);

      set({ authUser: res.data.data.user });

      toast.success("Account created successfully");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      toast.error(err.response?.data?.message || "Register failed");
    } finally {
      set({ isRegistering: false });
    }
  },

  // LOGIN
  login: async (data: LoginData) => {
    set({ isLoggingIn: true });

    try {
      const res = await axiosInstance.post<ApiResponse>("/login", data);

      set({ authUser: res.data.data.user });

      toast.success("Logged in successfully");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  // LOGOUT
  logout: async () => {
    try {
      await axiosInstance.post("/logout");

      set({ authUser: null });

      toast.success("Logged out successfully");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      toast.error(err.response?.data?.message || "Logout failed");
    }
  },

  // UPDATE PROFILE
  updateProfile: async (data: FormData) => {
    set({ isUpdatingProfile: true });

    try {
      const res = await axiosInstance.put("/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true
      });

      set({ authUser: res.data.data });

      toast.success("Profile updated successfully");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      console.log("Error updating profile:", err);

      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));