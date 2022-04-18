/* eslint-disable no-unused-vars */
export interface IUsersContext {
  users: IUser[];
  getAllUsers: () => Promise<void>;
  updateUserRole: (id: number, role: string) => Promise<boolean>;
  deleteUser: (id: number) => Promise<boolean>;
}

export interface IUser {
  id: number;
  username: string;
  role: string;
}
