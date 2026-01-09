export interface LoginRequest {
  username: string;
  password: string;
  stayLoggedIn: boolean;
}

export interface LoginResponse {
  token: string;
  expiresAt: string;
  attachmentToken: string;
}

export interface AuthError {
  message: string;
  statusCode?: number;
}
