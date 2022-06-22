import { User } from '../components';

interface Props {
  user: User | null | undefined;
}

const UsersTable: React.FC<Props> = ({ user }) => {
  return (
    <div className="users-table">
      <div key={user?.id}>{user?.username}</div>
    </div>
  );
};

export default UsersTable;
