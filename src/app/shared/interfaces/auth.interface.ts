export interface UserRegistrationData {
  email: string;
  password: string;
  name: string;
}

export interface UserLoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}
