import { User } from '../../components';
import {
  setActiveUsers,
  getActiveUsers,
  deleteActiveUser,
} from '../../services/activeUserService';

const user1: User = {
  id: 1,
  username: 'John',
  password: '',
};
const user2: User = {
  id: 1,
  username: 'Bill',
  password: '',
};

const socketId1 = 'abc123';
const socketId2 = 'xyz987';

describe('Active system users', () => {
  it('adds users and returns an array with users', () => {
    setActiveUsers(user1, socketId1);
    setActiveUsers(user2, socketId2);
    const users = getActiveUsers();
    expect(users).toHaveLength(2);
    expect(users[0].username).toEqual('John');
    expect(users[0].socketId).toEqual('abc123');
    expect(users[1].username).toEqual('Bill');
    expect(users[1].socketId).toEqual('xyz987');
  });
  it('removes user by socketId', () => {
    deleteActiveUser(socketId1);
    const users1 = getActiveUsers();
    expect(users1).toHaveLength(1);
    deleteActiveUser(socketId2);
    const users2 = getActiveUsers();
    expect(users2).toHaveLength(0);
  });
});
