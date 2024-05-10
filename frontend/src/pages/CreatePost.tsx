import Addpost from "../components/Addpost";
import Navbar from "../components/Navbar";

const CreatePost = () => {
  return (
    <div className="bg-[#17252e] h-[100vh]">
      <div className="bg-white">
        <Navbar />
      </div>
      <div className="flex justify-center h-[100%] items-center">
        <Addpost />
      </div>
    </div>
  );
};

export default CreatePost;
