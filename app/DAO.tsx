import { Text } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "ethers";
import { useEffect, useState } from "react";
import config from "../config.json";
import CreateProposal from "./CreateProposal";
import Proposals from "./Proposals";
import { Proposal } from "./Types";
import DAO_ABI from "./abis/DAO.json";
import useConnectStore from "./store";
import { formatUnits } from "./utils";

const DAO = ({ account }: { account: string | undefined }) => {
  const [treasuryBalance, setTreasuryBalance] = useState<string>();
  const [dao, setDao] = useState<Contract>();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [quorum, setQuorum] = useState<number>(0);

  const { provider } = useWeb3React();

  const connectStatus = useConnectStore((s) => s.connectStatus);

  useEffect(() => {
    if (account) {
      loadContract();
    }
  }, [account, connectStatus]);

  const loadContract = async () => {
    try {
      // Initiate Contracts
      const dao = new Contract(config[31337].dao.address, DAO_ABI, provider);
      setDao(dao);

      let treasuryBalance = await provider?.getBalance(dao.address);
      setTreasuryBalance(formatUnits(treasuryBalance?.toString() || "0"));

      const noOfProposals = await dao.proposalCount();
      const proposals = [];

      for (var i = 0; i < noOfProposals; i++) {
        const proposal = await dao.proposals(i + 1);
        proposals.push(proposal);
      }
      setProposals(proposals);

      setQuorum(await dao.quorum());
    } catch (error) {
      console.log("Error while loading dao. ", error);
    }
  };

  return (
    <div>
      <CreateProposal dao={dao} />

      <div className="py-8">
        <hr />
        <Text fontSize="sm" className="py-3">
          <strong>Treasury Balance: </strong>
          {treasuryBalance} ETH
        </Text>
        <hr />
      </div>
      <Proposals dao={dao} proposals={proposals} quorum={quorum} />
    </div>
  );
};

export default DAO;
