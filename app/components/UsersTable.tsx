import { User } from '../components';

interface Props {
  users: User[];
}

const UsersTable: React.FC<Props> = ({ users }) => {
  return (
    <div className="users-table">
      {users.map((user) => {
        return <div key={user.id}>{user.username}</div>;
      })}
    </div>
  );
};

export default UsersTable;
