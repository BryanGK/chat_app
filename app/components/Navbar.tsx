import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="navbar bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <Image
            src="/public/vercel.svg"
            alt="Chat app logo"
            width="30"
            height="24"
            className="d-inline-block align-text-top"
          ></Image>
          Welcome to Chat App
        </a>
      </div>
    </nav>
  );
}
