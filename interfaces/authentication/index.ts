import { IUser } from "interfaces/user";

export interface ILoginDataReq {
  email: string;
  password: string;
}

export interface IResendVerificationDataReq {
  email: string;
}

export interface ILoginDataRes {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
  user: IUser;
}

export interface ILoginSSOErrorRes {
  message: string;
  statusCode: string;
}

export interface IResendVerificationDataRes {
  message: string;
}

export interface ISignUpData {
  email: string;
  password: string;
}

export interface IForgotPasswordRequest {
  email: string;
}

export interface IResetPasswordRequest {
  newPassword: string;
  confirmNewPassword: string;
  token: string;
}

export interface IServerError {
  statusCode: number;
  name: string;
  message: string;
  code?: string;
  error?: string;
  status: number;
}

export interface IRequestHeader {
  Authorization?: string;
}

export interface IRefreshTokenResponse {
  accessToken: string;
  accessTokenExpiresIn: number
}
