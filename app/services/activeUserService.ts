import { User } from '../components';

const _activeUsers: Array<User> = [];
export const setActiveUsers = (user: User, socketId: string) => {
  _activeUsers.push({ socketId, ...user });
};

export const getActiveUsers = () => {
  return _activeUsers;
};

export const deleteActiveUser = (socketId: string) => {
  const index = _activeUsers.findIndex((item) => item.socketId === socketId);
  _activeUsers.splice(index, 1);
};
