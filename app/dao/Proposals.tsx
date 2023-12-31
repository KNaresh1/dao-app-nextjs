import {
  Box,
  Button,
  Center,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import useContractStore from "../store";
import {
  formatUnits,
  loadBalance,
  loadProposals,
  shortenAccount,
} from "../utils";

const Proposals = () => {
  const { provider } = useWeb3React();

  const [dao, quorum, proposals, addProposals, addBalance] = useContractStore(
    (s) => [s.dao, s.quorum, s.proposals, s.addProposals, s.addBalance]
  );

  const voteProposal = async (id: number) => {
    try {
      const signer = await provider?.getSigner();

      const transaction = await dao.connect(signer || "0x0").vote(id);
      await transaction.wait();

      loadProposals(dao, addProposals);
    } catch (error) {
      console.log(`User rejected or transaction reverted.  ${error}`);
    }
  };

  const finalizeProposal = async (id: number) => {
    try {
      const signer = await provider?.getSigner();
      const transaction = await dao
        ?.connect(signer || "0x0")
        .finalizeProposal(id);
      await transaction.wait();

      loadProposals(dao, addProposals);
      loadBalance(provider, dao, addBalance);
    } catch (error) {
      console.log(`User rejected or transaction reverted. ${error}`);
    }
  };

  return (
    <Center py={8}>
      <Box maxWidth="100%" overflowY="auto" border="1px" color="blue.600" p={3}>
        <Table color="blue.600" variant="striped" size="sm">
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Proposal Name</Th>
              <Th>Recipient Address</Th>
              <Th>Amount</Th>
              <Th>Status</Th>
              <Th>Total Votes</Th>
              <Th>Cast Vote</Th>
              <Th>Finalize</Th>
            </Tr>
          </Thead>
          <Tbody>
            {proposals.map((p, index) => {
              const { id, name, amount, recipient, votes, finalized } = p;
              return (
                <Tr key={index}>
                  <Td>{id.toString()}</Td>
                  <Td>{name}</Td>
                  <Td>{shortenAccount(recipient)}</Td>
                  <Td>{formatUnits(amount.toString())} ETH</Td>
                  <Td>{finalized ? "Approved" : "In Progress"}</Td>
                  <Td>{votes.toString()}</Td>
                  <Td>
                    {!finalized && (
                      <Button
                        colorScheme="blue"
                        size="xs"
                        width="100%"
                        onClick={() => voteProposal(id)}
                      >
                        Vote
                      </Button>
                    )}
                  </Td>
                  <Td>
                    {!finalized && votes > quorum && (
                      <Button
                        colorScheme="blue"
                        size="xs"
                        width="100%"
                        onClick={() => finalizeProposal(id)}
                      >
                        Finalize
                      </Button>
                    )}
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </Center>
  );
};

export default Proposals;
