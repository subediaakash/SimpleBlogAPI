interface IButtonProps {
  onSubmit: () => void;
  value: string;
  className?: string;
}

const Button = ({ onSubmit, value, className }: IButtonProps) => {
  return (
    <div>
      <button className={className} onClick={onSubmit}>
        {value}{" "}
      </button>
    </div>
  );
};

export default Button;
