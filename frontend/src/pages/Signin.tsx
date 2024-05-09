import { useState, ChangeEvent } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmit = async () => {
    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const response = await axios.post("http://localhost:3000/api/v1/signin", {
        email,
        password,
      });

      console.log(response.data);
      localStorage.clear();
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Input
        value={email}
        placeholder="Enter the email"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setEmail(e.target.value);
        }}
      />
      <Input
        value={password}
        placeholder="Enter the password"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setPassword(e.target.value);
        }}
      />
      <Input
        value={confirmPassword}
        placeholder="Confirm Password"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setConfirmPassword(e.target.value);
        }}
      />
      <Button onSubmit={onSubmit} value="Sign in" />
    </div>
  );
};

export default Signin;
