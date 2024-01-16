import { FC, ReactNode } from "react";

interface Menu {
  children: ReactNode;
}

const Menu: FC<Menu> = ({ children }) => {
  return (
    <div className="rounded-md flex flex-col shadow hover:shadow-lg bg-[#e7e5e4] max-h-[300px] overflow-y-scroll">
      {children}
    </div>
  );
};

export default Menu;
