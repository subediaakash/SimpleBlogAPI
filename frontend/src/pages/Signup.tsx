import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [name, SetName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = async () => {
    const response = await axios.post("http://localhost:3000/api/v1/signup", {
      email,
      password,
      name,
    });
    console.log(response.data);
    localStorage.clear();
    localStorage.setItem("token", response.data.token);
    navigate("/");
  };

  return (
    <div>
      <Input
        value={name}
        placeholder="Enter the name"
        onChange={(e) => {
          SetName(e.target.value);
        }}
      />

      <Input
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Enter the email"
      />
      <Input
        value={password}
        placeholder="Enter the password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <Button onSubmit={onSubmit} value="Sign up" />
    </div>
  );
};

export default Signup;
