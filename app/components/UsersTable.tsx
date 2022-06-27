import { User } from '../components';

interface Props {
  user: User | null | undefined;
  activeUsers: User[];
}

const UsersTable: React.FC<Props> = ({ user, activeUsers }) => {
  return (
    <div className="users-table">
      <div key={user?.id}>{user?.username}</div>
      {activeUsers
        .filter((item) => item.id !== user?.id)
        .map((user) => {
          return <div key={user?.id}>{user?.username}</div>;
        })}
    </div>
  );
};

export default UsersTable;
