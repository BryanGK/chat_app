import Image from 'next/image';
import { NavItem, NavLink, Navbar, NavbarBrand } from 'reactstrap';

export default function Nav() {
  return (
    <Navbar color="info">
      <NavbarBrand href="/">
        <Image
          src="/discussion.png"
          alt="Chat app logo"
          width="60"
          height="48"
          className="nav-image"
        />
        <h4>yu | chat</h4>
      </NavbarBrand>
    </Navbar>
  );
}
