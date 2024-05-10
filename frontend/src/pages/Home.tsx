import Navbar from "../components/Navbar";
import OtherUsersPost from "../components/OtherUsersPost";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div>
        <div className="flex justify-center flex-col items-center">
          <p>Online Blog Posting Application</p>
        </div>
        <div className="flex justify-center flex-col items-center">
          <OtherUsersPost />
        </div>
      </div>
    </div>
  );
};

export default Home;
