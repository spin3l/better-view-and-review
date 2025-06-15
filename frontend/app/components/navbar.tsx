import { Link } from "react-router";

const links = [
  {
    name: <img src="img/vr.png" className="h-full" />,
    pathname: "/",
  },
  {
    name: <p>Login</p>,
    pathname: "/auth/login",
  },
];

function Navbar() {
  return (
    <div className="w-full h-12 bg-primary items-center">
      <nav className="size-full flex justify-between items-center px-32 font-semibold text-accent">
        {links.map(({ name, pathname }) => (
          <Link
            key={pathname}
            to={{
              pathname: pathname,
            }}
            className="h-full flex items-center hover:underline"
          >
            {name}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Navbar;
