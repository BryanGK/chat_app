import Image from 'next/image';
import { Nav, NavItem, NavLink } from 'reactstrap';

export default function Navbar() {
  return (
    <Nav className="bg-light">
      <NavItem>
        {' '}
        <Image
          src="/vercel.svg"
          alt="Chat app logo"
          width="60"
          height="48"
          className="d-inline-block align-text-top"
        ></Image>
      </NavItem>
      <NavItem>
        <NavLink active href="#">
          Welcome to Chat App
        </NavLink>
      </NavItem>
    </Nav>
  );
}
