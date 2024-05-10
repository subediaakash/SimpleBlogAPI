import Navbar from "../components/Navbar";
import OtherUsersPost from "../components/OtherUsersPost";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center flex-col items-center">
        <div className="text-center">Online Blog Posting Application</div>
        <div>
          <OtherUsersPost />
        </div>
      </div>
    </div>
  );
};

export default Home;
