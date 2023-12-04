import { Contract } from "ethers";
import { formatUnits } from "./utils";

export const loadBalance = async (
  provider: any,
  dao: Contract,
  addBalance: (balance: number) => void
) => {
  const _treasuryBalance = await provider?.getBalance(dao.address);
  addBalance(Number(formatUnits(_treasuryBalance?.toString())));
};

export const loadProposals = async (
  dao: Contract,
  addProposals: (proposals: any[]) => void
) => {
  const noOfProposals = await dao.proposalCount();
  const proposals = [];

  for (var i = 0; i < noOfProposals; i++) {
    const proposal = await dao.proposals(i + 1);
    proposals.push(proposal);
  }
  addProposals(proposals);
};
