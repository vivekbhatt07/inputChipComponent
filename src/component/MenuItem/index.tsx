import { FC, ReactNode } from "react";

interface MenuItem {
  children: ReactNode;
  onClick: () => void;
}

const MenuItem: FC<MenuItem> = ({ children, onClick }) => {
  return (
    <div
      className="p-4 cursor-pointer hover:bg-[#a8a29e] first:rounded-t-md last:rounded-b-md transition-all"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default MenuItem;
