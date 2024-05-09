import { useState, useCallback } from "react";
import Input from "./Input";
import Button from "./Button";
import axios from "axios";

const Addpost = () => {
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
      <Input
        placeholder="Enter the title "
        onChange={handleTitleChange}
        value={title}
      />
      <Input
        placeholder="Enter the content"
        onChange={handleContentChange}
        value={content}
      />
      <Button value="submit" onSubmit={addPost} />
    </div>
  );
};

export default Addpost;
