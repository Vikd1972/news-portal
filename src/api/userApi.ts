import instance from '.';

import type { IUserType } from '../store/newsPortalSlice';

class UserEndpoints {
  static signUp = () => '/auth/sign-up';

  static sigIn = () => '/auth/sign-in';

  static getMe = () => '/auth/me';
}

type SignUpType = {
  email: string;
  password: string;
};

type AuthResponseType = {
  user: IUserType;
  tokens: {
    authorization: string;
    refresh: string;
  };
};

export const signUp = async (data: SignUpType): Promise<AuthResponseType> => {
  const result = await instance.post(
    UserEndpoints.signUp(),
    data,
  );

  localStorage.setItem('authToken', result.data.data.tokens.authorization);
  localStorage.setItem('refreshToken', result.data.data.tokens.refresh);

  return result.data.data;
};

export const signIn = async (data: SignUpType): Promise<AuthResponseType> => {
  const result = await instance.post(
    UserEndpoints.sigIn(),
    data,
  );

  localStorage.setItem('authToken', result.data.data.tokens.authorization);
  localStorage.setItem('refreshToken', result.data.data.tokens.refresh);

  return result.data.data;
};

export const getMe = async (): Promise<AuthResponseType> => {
  const result = await instance.get(
    UserEndpoints.getMe(),
  );

  return result.data.data;
};
