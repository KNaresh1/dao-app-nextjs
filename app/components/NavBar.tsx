"use client";

import { Button, Flex, Spacer, Text } from "@chakra-ui/react";
import Image from "next/image";
import logo from "../../public/logo.png";
import { useConnectWallet } from "../connect";
import { shortenAccount } from "../utils";

const NavBar = () => {
  const {
    account,
    active: isActive,
    loading: isConnecting,
    connectWallet,
  } = useConnectWallet();

  return (
    <Flex align="center" gap="3" p={3}>
      <Image src={logo} alt="Logo" style={{ width: "40px", height: "40px" }} />
      <Text fontSize="lg">Decentralized DAO</Text>

      <Spacer />

      {isActive && account ? (
        <Text fontSize="md">{shortenAccount(account)}</Text>
      ) : (
        <Button
          colorScheme="blue"
          size="sm"
          isLoading={isConnecting}
          loadingText={"Connecting"}
          onClick={() => connectWallet()}
        >
          Connect Wallet
        </Button>
      )}
    </Flex>
  );
};

export default NavBar;
