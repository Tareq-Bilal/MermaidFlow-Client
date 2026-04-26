// types/api.ts

export interface AuthResponse {
  token: string;
  refreshToken: string;
  userId: string;
  email: string;
  displayName: string;
  expiresAt: string;
  refreshTokenExpiresAt: string;
}

export interface UserResponse {
  id: string;
  email: string;
  displayName: string;
  createdAt: string;
}

export interface DocumentResponse {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
  tags: string[];
}

export interface MermaidValidationResponse {
  isValid: boolean;
  errorMessage: string | null;
}
