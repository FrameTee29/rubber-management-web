export type RegisterForm = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  confirmPassword?: string;
};

export type RegisterPersonalDetail = {
  firstName: string;
  lastName: string;
  phone: string;
};

export type RegisterAccountDetail = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginForm = {
  username: string;
  password: string;
};

export type TLoginResponse = {
  accessToken: string;
  refreshToken: string;
};
