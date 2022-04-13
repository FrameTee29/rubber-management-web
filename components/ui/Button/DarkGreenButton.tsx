import { ButtonHTMLAttributes, FC } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const DarkGreenButton: FC<IProps> = ({ className, children, ...rest }) => {
  return (
    <button
      {...rest}
      className={`${className} border py-2 min-w-[160px] border-dark-green-primary text-white font-semibold rounded-full bg-dark-green-primary hover:bg-dark-green-secondary`}
    >
      {children}
    </button>
  );
};

export default DarkGreenButton;
