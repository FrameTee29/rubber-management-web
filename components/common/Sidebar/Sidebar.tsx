import { FC } from "react";
import ReactTooltip from "react-tooltip";
import { LogoutIcon, UserAddIcon } from "@heroicons/react/solid";
import { MenuSidebar } from "../MenuSidebar";
import Image from "next/image";

const Sidebar: FC = () => {
  return (
    <div className="flex flex-col justify-between items-center h-screen w-20 bg-dark-green-primary py-2">
      <ReactTooltip effect="solid" />
      <div>
        <Image src="/images/logo_transparent.png" width={80} height={80} />
      </div>

      <div className="flex-0 space-y-4">
        {MenuSidebar.map((menu, index) => {
          return (
            <div key={index}>
              <p
                data-tip={menu.title}
                className="h-10 w-10 text-cream-primary hover:text-cream-secondary text-center"
              >
                <a href={menu.href} >{menu.icon}</a>
              </p>
            </div>
          );
        })}
      </div>
      <div>
        <p data-tip="Logout">
          <LogoutIcon className="h-10 w-10 text-cream-primary hover:text-cream-secondary text-center" />
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
