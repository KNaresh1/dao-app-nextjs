"use client";

import { Button, Heading } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";
import NavBar from "./NavBar";
import useConnectStore from "./store";

const Home = () => {
  const { connector, hooks } = useWeb3React();
  const { useSelectedAccount } = hooks;
  const account = useSelectedAccount(connector);

  const connectStatus = useConnectStore((s) => s.connectStatus);
  const setConnectStatus = useConnectStore((s) => s.setConnectStatus);

  useEffect(() => {
    if (connectStatus === "Connecting") {
      connectWallet();
    }
  }, [connectStatus]);

  const connectWallet = async () => {
    const chainId = "31337";
    try {
      await connector.activate(chainId);
      setConnectStatus("Connected");
    } catch (error) {
      setConnectStatus("Not Connected");
      console.log("Failed to connect to wallet or User rejected", error);
    }
  };

  return (
    <div className="text-center space-y-8">
      <NavBar account={account} />

      <Heading as="h6" size="lg">
        Welcome to our DAO!
      </Heading>

      {(connectStatus !== "Connected" || !account) && (
        <Button
          isLoading={connectStatus === "Connecting"}
          loadingText="Connecting"
          variant="outline"
          colorScheme="blue"
          onClick={() => setConnectStatus("Connecting")}
        >
          Connect To Wallet
        </Button>
      )}
    </div>
  );
};

export default Home;
