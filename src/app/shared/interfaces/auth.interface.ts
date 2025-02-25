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

export interface UserLoggedData {
  name: string;
  email: string;
  phoneNumber?: string;
  deliveryAddress?: {
    city: string;
    street: string;
    region: string;
  };
  novaPostDepartment?: string;
  age?: number;
}
