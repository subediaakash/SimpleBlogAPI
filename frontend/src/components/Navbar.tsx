import { Link } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
const Navbar = () => {
  return (
    <div>
      <div className="flex justify-between p-4">
        <ul className="flex gap-4 items-center px-4  font-bold">
          <Link to={"/"}>HOME</Link>
          <Link to={"/profile"}>MY POSTS</Link>
          <Link to={"/new"}>WRITE</Link>
          <Link to={"/profile"}>SEARCH</Link>
        </ul>
        <div className="flex items-center gap-2 cursor-pointer">
          Logout
          <CiLogout />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
