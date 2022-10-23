import { NavLink } from "react-router-dom";

function Navbar() {
  const common = ["text-3xl my-3.5 mx-2.5 underline"];

  return (
    <nav className="w-full p-1 flex justify-center items-center">
      <NavLink className={common.join(" ")} to="/home">
        Home
      </NavLink>
      <NavLink className={common.join(" ")} to="/user-profile">
        Profile
      </NavLink>
    </nav>
  );
}

export default Navbar;
