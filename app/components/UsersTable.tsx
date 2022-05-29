interface User {
  id: string;
  username: string;
}

interface UsersList {
  users: User[];
}

const UsersTable: React.FC<UsersList> = ({ users }) => {
  return (
    <div className="users-table">
      {users.map((user) => {
        return <div key={user.id}>{user.username}</div>;
      })}
    </div>
  );
};

export default UsersTable;
