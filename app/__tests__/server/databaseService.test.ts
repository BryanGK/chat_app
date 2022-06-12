import AppDataSource from '../../database/data-source';
import { UserEntity } from '../../database/entity/UserEntity';

describe('databaseService getData fn', () => {
  it('get user data when passed the user entity', () => {
    const expected: UserEntity = {
      id: 0,
      username: 'Bob',
    };
    jest.mock('typeorm', () => ({
      getRepository: jest.fn().mockResolvedValue(expected),
    }));
  });
});
