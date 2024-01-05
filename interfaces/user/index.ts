export interface IUser {
  [key: string]: any;
  createdAt?: Date;
  dob?: string;
  email?: string;
  firstName?: string;
  id?: string;
  lastName?: string;
  updatedAt?: Date;
  avatar?: string;
  role?: string;
  status?: string;
}

export interface IVerifyTokenResponse {
  isValidToken: boolean;
}
