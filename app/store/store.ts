import { Contract } from "ethers";
import { create } from "zustand";

interface DaoStore {
  dao: Contract;
  setDAO: (dao: Contract) => void;
}

const useContractStore = create<DaoStore>((set) => ({
  dao: {} as Contract,
  setDAO: (dao) => set(() => ({ dao })),
}));

export default useContractStore;
