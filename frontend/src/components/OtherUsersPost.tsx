import { useState } from "react";
import { randomPosts } from "../store/atoms/posts.atom";
import { fetchRandomPosts } from "../utils/fetchOtherUsersPost";
import useRecoilDataFetcher from "../Hooks/useRecoilDataFetcher";
import { CiHeart } from "react-icons/ci";

const OtherUsersPost = () => {
  const posts = useRecoilDataFetcher(randomPosts, fetchRandomPosts);
  const [liked, setLiked]: any = useState({});

  const handleLikeClick = (postId: any) => {
    setLiked((prevLiked: any) => ({
      ...prevLiked,
      [postId]: !prevLiked[postId],
    }));
  };

  return (
    <div className="flex flex-col gap-7 ">
      {posts.map((post: any) => (
        <div key={post.id} className="flex justify-center py-3">
          <div className="w-1/3 px-5 flex flex-col gap-4">
            <h1 className="text-xl font-bold"> {post.title}</h1>
            <h2 className="text-slate-500"> {post.content}</h2>
            <div className="flex justify-end items-center gap-4">
              <button onClick={() => handleLikeClick(post.id)}>
                <CiHeart
                  style={{ color: liked[post.id] ? "red" : "black" }}
                  className="font-bold"
                />{" "}
              </button>
              <p>{post.creator.name}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OtherUsersPost;
