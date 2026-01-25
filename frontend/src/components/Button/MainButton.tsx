import { FC } from "react";

interface MainButtonProps {
  value: string;
  classes?: string;
}

const MainButton: FC<MainButtonProps> = ({ value, classes }): JSX.Element => {
  return (
    <button
      className={`bg-primary-color text-white uppercase ${classes} rounded-lg hover:bg-green-700 transition-all duration-300 ease-linear hover:scale-105 hover:shadow-xl`}
    >
      {value}
    </button>
  );
};

export default MainButton;
