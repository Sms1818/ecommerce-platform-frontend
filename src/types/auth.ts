export interface SignUpRequest {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  profileImageUrl: string;
}

export interface LoginRequest {
  emailOrUsername: string;
  password: string;
}

export interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  profileImageUrl: string;
  role: string;
}

export interface AuthResponse {
  message: string;
  response: UserResponse;
  token?: string | null;
}
