import { Box, Divider, Text } from "@chakra-ui/react";
import useContractStore from "../store";
import CreateProposal from "./CreateProposal";
import Proposals from "./Proposals";

const DAO = () => {
  const balance = useContractStore((s) => s.balance);

  return (
    <Box>
      <CreateProposal />

      <Box>
        <Divider borderBottomWidth="1px" borderColor="gray.300" />
        <Text fontSize="md" py={3}>
          <strong>Treasury Balance: </strong>
          {balance} ETH
        </Text>
        <Divider borderBottomWidth="1px" borderColor="gray.300" />
      </Box>

      <Proposals />
    </Box>
  );
};

export default DAO;
