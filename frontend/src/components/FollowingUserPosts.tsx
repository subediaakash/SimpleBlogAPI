import { followingPosts } from "../store/atoms/followingpost.atom";
import useRecoilDataFetcher from "../Hooks/useRecoilDataFetcher";
import { fetchFollowingUsersPosts } from "../utils/fetchFollowingUsersPost";

const FollowingUserPosts = () => {
  const posts = useRecoilDataFetcher(followingPosts, fetchFollowingUsersPosts);

  return (
    <>
      {posts != null && posts.length > 0 ? (
        <>
          {posts.map((post: any) => (
            <div key={post.id}>
              <h1>{post.title}</h1>
              <h2>{post.content}</h2>
            </div>
          ))}
        </>
      ) : (
        <div>no followers found</div>
      )}
    </>
  );
};

export default FollowingUserPosts;
