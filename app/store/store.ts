import { Contract } from "ethers";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";

interface DaoStore {
  dao: Contract;
  balance: number;
  quorum: number;
  proposals: any[];
  setDAO: (dao: Contract) => void;
  setQuorum: (quorum: number) => void;
  addBalance: (balance: number) => void;
  addProposals: (proposals: any[]) => void;
}

const useContractStore = create<DaoStore>((set) => ({
  dao: {} as Contract,
  balance: 0,
  quorum: 0,
  proposals: [],
  setDAO: (dao) => set(() => ({ dao })),
  setQuorum: (quorum) => set(() => ({ quorum })),
  addBalance: (balance) => set(() => ({ balance })),
  addProposals: (proposals) => set(() => ({ proposals })),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("AMM Store", useContractStore);
}

export default useContractStore;
