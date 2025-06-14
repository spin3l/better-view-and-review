import React from "react";
import { Link } from "react-router";

const links = [
  {
    name: "Home",
    pathname: "/",
  },
  {
    name: "Login",
    pathname: "/auth/login",
  },
];

function Navbar() {
  return (
    <div className="w-full h-10 bg-secondary items-center">
      <nav className="size-full flex justify-between items-center px-32 font-semibold text-accent">
        {links.map(({ name, pathname }) => (
          <Link
            to={{
              pathname: pathname,
            }}
            className="hover:underline"
          >
            {name}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Navbar;
