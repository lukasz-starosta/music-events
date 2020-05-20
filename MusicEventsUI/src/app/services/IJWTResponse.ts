export interface IJWTResponse {
  accessToken: string;
  type: string;
  username: string;
  authorities: string[];
}
