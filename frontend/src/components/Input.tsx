import React from "react";

interface IProps {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const Input = ({ placeholder, onChange }: IProps) => {
  return (
    <div>
      <input type="text" placeholder={placeholder} onChange={onChange} />
    </div>
  );
};

export default Input;
