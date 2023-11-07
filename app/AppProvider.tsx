import React from "react";
import UIProvider from "./UIProvider";
import Web3Provider from "./Web3Provider";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Web3Provider>
      <UIProvider>{children}</UIProvider>
    </Web3Provider>
  );
};

export default AppProvider;
