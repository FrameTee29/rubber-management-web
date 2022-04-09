import { ButtonHTMLAttributes, FC } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const WhiteButton: FC<IProps> = ({ ...rest }) => {
  return (
    <button
      {...rest}
      className={`border py-2 min-w-[160px] bg-white text-dark-green-primary rounded-full hover:text-white hover:bg-dark-green-primary hover:border-cream-primary`}
    />
  );
};

export default WhiteButton;
