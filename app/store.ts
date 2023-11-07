import { create } from "zustand";

type connectStatusType = "Not Connected" | "Connecting" | "Connected";

interface ConnectStore {
    connectStatus:  connectStatusType;
    setConnectStatus: (status: connectStatusType) => void;
}

const useConnectStore = create<ConnectStore>(set => ({
    connectStatus: "Not Connected",
    setConnectStatus: status => set(() => ({connectStatus: status})),
}));

export default useConnectStore;