import { useWeb3React } from "@web3-react/core";
import { Contract } from "ethers";
import { useEffect } from "react";

import DAO_ABI from "../abis/DAO.json";
import config from "../config";
import useContractStore from "../store";
import { loadBalance, loadProposals } from "../utils";

const useLoadContract = () => {
  const { provider, account, chainId } = useWeb3React();

  const [setDAO, setQuorum, addBalance, addProposals] = useContractStore(
    (s) => [s.setDAO, s.setQuorum, s.addBalance, s.addProposals]
  );

  const currentChainConfig = config.chains[chainId?.toString() || ""];

  const loadContract = async () => {
    try {
      // DAO
      const dao = new Contract(
        currentChainConfig.daoAddress,
        DAO_ABI,
        provider
      );
      setDAO(dao);

      setQuorum(await dao.quorum());

      loadBalance(provider, dao, addBalance);

      loadProposals(dao, addProposals);
    } catch (error) {
      console.error("Error while loading contract. ", error);
    }
  };

  useEffect(() => {
    if (chainId && account && provider) {
      loadContract();
    }
  }, [chainId, account, provider]);
};

export default useLoadContract;
