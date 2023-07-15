export type IUserAuth = {
  phoneNumber: string;
  password: string;
};

export type IJWTResponse = {
  accessToken: string;
  refreshToken?: string;
};
