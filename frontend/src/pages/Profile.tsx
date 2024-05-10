import { useState, useEffect } from "react";
import { fetchUser } from "../utils/fetchUsersPost";
import GetPost from "../components/GetPost";
import FollowingUserPosts from "../components/FollowingUserPosts";
import Navbar from "../components/Navbar";

const Profile = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetchUser();
      setPosts(response);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <Navbar />
      <GetPost props={posts} />
      {/* <FollowingUserPosts /> */}
    </div>
  );
};

export default Profile;
