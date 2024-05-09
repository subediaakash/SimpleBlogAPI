import React from "react";

interface IButtonProps {
  onSubmit: () => void;
  value: string;
}

const Button = ({ onSubmit, value }: IButtonProps) => {
  return (
    <div>
      <button onClick={onSubmit}>{value}</button>
    </div>
  );
};

export default Button;
