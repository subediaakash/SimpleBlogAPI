import React from "react";
import { useState, useEffect } from "react";
import { fetchUser } from "../utils/fetchUsersPost";
import GetPost from "../components/GetPost";

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
      <GetPost props={posts} />
    </div>
  );
};

export default Profile;
