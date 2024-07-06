import React from "react";
import { BsSendFill } from "react-icons/bs";

const Header = () => {
  return (
    <header className="flex items-center w-full bg-header p-3 text-white">
      <div className="flex gap-2 px-10 items-center">
        <BsSendFill size={27}/>
        <h1 className="text-xl font-semibold">WhatsApp Direct</h1>
      </div>
    </header>
  );
};

export default Header;
