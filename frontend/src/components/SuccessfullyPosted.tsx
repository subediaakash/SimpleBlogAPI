import React from "react";
import { useNavigate } from "react-router-dom";
import image from "../assets";
import Navbar from "./Navbar";

const SuccessfullyPosted = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/profile");
  };
  return (
    <div>
      <Navbar />
      <div className="h-[80vh] flex items-center justify-center">
        <div className="flex  justify-center gap-4">
          <div className=" flex flex-col justify-center gap-3   h-[250px]">
            <div className="font-bold text-2xl">
              Your Blog has been posted successfully
            </div>
            <div className="font-bold text-2xl">
              Navigate to all your recently posted Blogs
            </div>
            <div className="flex items-center justify-center">
              {" "}
              <button
                className="border-2 border-orange-400 p-1 rounded-md"
                onClick={onClick}
              >
                MY BLOGS
              </button>
            </div>
          </div>
          <div>
            <img src={image} className="h-[250px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessfullyPosted;
