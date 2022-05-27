import { Navbar, MessagesTable, UsersTable } from '../components';

export default function Layout() {
  return (
    <div>
      <Navbar></Navbar>
      <h1>Chat App</h1>
      <UsersTable></UsersTable>
      <MessagesTable></MessagesTable>
    </div>
  );
}
