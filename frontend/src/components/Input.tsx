import React from "react";

interface IProps {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  className?: string;
  style?: any;
}

const Input = ({ placeholder, onChange, className }: IProps) => {
  return (
    <div>
      <textarea
        placeholder={placeholder}
        onChange={onChange}
        className={`${className}`}
        style={{ resize: "none" }}
      />
    </div>
  );
};

export default Input;
