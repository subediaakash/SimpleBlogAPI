const Navbar = () => {
  return (
    <div>
      <div className="flex justify-between">
        <ul className="flex gap-3 items-center">
          <li>HOME</li>
          <li>MY POSTS</li>
          <li>FOLLOWING</li>
          <li>SEARCH</li>
        </ul>
        <div>Profile</div>
      </div>
    </div>
  );
};

export default Navbar;
