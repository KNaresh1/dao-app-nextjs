import {
  Button,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "ethers";
import { Proposal } from "./Types";
import useConnectStore from "./store";
import { formatUnits } from "./utils";

const Proposals = ({
  dao,
  proposals,
  quorum,
}: {
  dao: Contract | undefined;
  proposals: Proposal[];
  quorum: number;
}) => {
  const { provider } = useWeb3React();

  const { setConnectStatus } = useConnectStore();

  const voteProposal = async (id: number) => {
    try {
      const signer = await provider?.getSigner();
      const transaction = await dao?.connect(signer || "0x0").vote(id);
      await transaction.wait();

      setConnectStatus("Connecting");
    } catch (error) {
      console.log("User rejected or transaction reverted. Error: ", error);
    }
  };

  const finalizeProposal = async (id: number) => {
    try {
      const signer = await provider?.getSigner();
      const transaction = await dao
        ?.connect(signer || "0x0")
        .finalizeProposal(id);
      await transaction.wait();

      setConnectStatus("Connecting");
    } catch (error) {
      console.log("User rejected or transaction reverted. Error: ", error);
    }
  };

  return (
    <div className="py-8">
      <TableContainer>
        <Table variant="striped" colorScheme="grey" size="sm">
          <TableCaption>Proposals</TableCaption>
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
                  <Td>{recipient}</Td>
                  <Td>{formatUnits(amount.toString())} ETH</Td>
                  <Td>{finalized ? "Approved" : "In Progress"}</Td>
                  <Td>{votes.toString()}</Td>
                  <Td>
                    {!finalized && (
                      <Button
                        colorScheme="blue"
                        variant="outline"
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
                        variant="outline"
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
      </TableContainer>
    </div>
  );
};

export default Proposals;
