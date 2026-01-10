export interface LoginRequest {
  username: string;
  password: string;
  stayLoggedIn: boolean;
}

export interface LoginResponse {
  token: string;
  expiresAt: string;
  attachmentToken: string;
  user?: {
    id: string;
    name: string;
    email: string;
    username: string;
  };
}

export interface AuthError {
  message: string;
  statusCode?: number;
}
