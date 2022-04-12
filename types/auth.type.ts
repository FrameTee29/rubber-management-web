export type RegisterForm = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
};

export type LoginForm = {
  email: string;
  password: string;
};

export type TLoginResponse = {
  accessToken: string;
  refreshToken: string;
};
