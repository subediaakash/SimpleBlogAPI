import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";
import axios from "axios";

const Addpost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const addPost = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/api/v1/new",
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/success");
    } catch (err) {
      console.log(err);
    }
  };

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    []
  );

  const handleContentChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setContent(e.target.value);
    },
    []
  );

  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-4 ">
        <div className="flex items-start w-[50vw] ">
          <p className="font-bold text-2xl text-white ">LET YOUR WORDS SPEAK</p>
        </div>
        <Input
          className="border  w-[50vw] pt-1 pl-3 border-rose-500 border-solid rounded-lg"
          placeholder="Enter the title "
          onChange={handleTitleChange}
          value={title}
        />
        <Input
          className="h-[50vh] w-[50vw] p-4 border  focus:outline-none  border-rose-500 border-solid rounded-lg"
          placeholder="Enter the content"
          onChange={handleContentChange}
          value={content}
        />
        <div className="flex items-start w-[50vw] ">
          <Button
            value="SUBMIT"
            onSubmit={addPost}
            className=" font-bold p-1 bg-green-400 text-white rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Addpost;
