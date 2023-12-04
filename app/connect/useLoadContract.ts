import { useWeb3React } from "@web3-react/core";
import { Contract } from "ethers";
import { useEffect } from "react";

import DAO_ABI from "../abis/DAO.json";
import config from "../config";
import useContractStore from "../store";

const useLoadContract = () => {
  const { provider, account, chainId } = useWeb3React();

  const setDAO = useContractStore((s) => s.setDAO);

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
