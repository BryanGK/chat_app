import authenticateUser from '../../services/authService';
import * as bcrypt from 'bcrypt';

const isAuthMock = jest.fn();

describe('authService tests', () => {
  it('returns authenticated user', () => {
    // authenticateUser();
  });
  it('throws an error when password is incorrect', () => {});
});
