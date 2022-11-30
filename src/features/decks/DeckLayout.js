import { Outlet } from "react-router-dom";
import { Moon, Sun } from "react-feather";
import DeckList from "features/decks/DeckList";
import DeckLayoutHeader from "./DeckLayoutHeader";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import profileLogo from "assets/images/user-profile.jpg";
import gorilla from "assets/images/gorilla-logo.png";

function DeckLayout() {
  return (
    <>
      <header className="flex items-center border-b-2 bg-white">
        <div className="flex w-full items-center justify-between px-5">
          <div className="h-[60px] py-2">
            <img src={gorilla} className="h-full" alt="Gorilla Cards" />
          </div>
          <div className="flex items-center">
            <div className=" flex justify-center cursor-pointer">
              <Moon className="h-6 w-6 text-gray-500 invisible" />
              <Sun className="h-6 w-6 text-gray-500" />
            </div>
            <div className="ml-6">
              <Tippy
                interactive={true}
                className="bg-white"
                trigger="click"
                content={<DeckLayoutHeader />}>
                <div className="cursor-pointer">
                  <img
                    src={profileLogo}
                    className="h-10 w-10 rounded-full"
                    alt="User"
                  />
                </div>
              </Tippy>
            </div>
          </div>
        </div>
      </header>
      <div style={{ height: "calc(100vh - 62px)" }}>
        <div className="flex h-full">
          <DeckList />
          <Outlet />
        </div>
      </div>
    </>
  );
}
export default DeckLayout;
