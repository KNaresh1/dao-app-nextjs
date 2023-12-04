"use client";

import { Box, Heading, Text } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import useLoadContract from "./connect";
import DAO from "./dao/DAO";

const Home = () => {
  const { account } = useWeb3React();
  useLoadContract();

  return (
    <Box py={6} textAlign="center">
      <Heading size="lg">Welcome to DAO!</Heading>
      {account ? (
        <DAO />
      ) : (
        <Text align="center" fontSize="lg" mt={3}>
          Please connect to Wallet...
        </Text>
      )}
    </Box>
  );
};

export default Home;
