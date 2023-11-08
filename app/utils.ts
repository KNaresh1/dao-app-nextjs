import { ethers } from "ethers";

export const formatUnits = (value: string) => {
    return ethers.utils.formatUnits(value, 18);
}

export const parseUnits = (value: string) => {
    return ethers.utils.parseUnits(value.toString(), 'ether');
}