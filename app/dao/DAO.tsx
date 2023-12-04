import { Box, Divider, Text } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import useContractStore from "../store";
import { formatUnits } from "../utils";
import CreateProposal from "./CreateProposal";
import Proposals from "./Proposals";

const DAO = () => {
  const { provider } = useWeb3React();
  const [treasuryBalance, setTreasuryBalance] = useState<string>();

  const dao = useContractStore((s) => s.dao);

  useEffect(() => {
    if (dao) {
      loadTreasuryBalance();
    }
  }, [dao]);

  const loadTreasuryBalance = async () => {
    const _treasuryBalance = await provider?.getBalance(dao.address);
    setTreasuryBalance(formatUnits(_treasuryBalance?.toString() || "0"));
  };

  return (
    <Box>
      <CreateProposal />

      <Box>
        <Divider borderBottomWidth="1px" borderColor="gray.300" />
        <Text fontSize="md" py={3}>
          <strong>Treasury Balance: </strong>
          {treasuryBalance} ETH
        </Text>
        <Divider borderBottomWidth="1px" borderColor="gray.300" />
      </Box>

      <Proposals />
    </Box>
  );
};

export default DAO;
