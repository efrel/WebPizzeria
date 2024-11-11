export interface ApiResponse<T> {
  data: T;
  isSuccess: boolean;  // Mantuve el typo como está en tu interfaz
  message: string;
  error: any[];
  errorMessage: any[];
}

// src/app/core/models/auth.model.ts
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  confirmPhoneNumber: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: UserInfo;
}

export interface UserInfo {
  id: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
}
