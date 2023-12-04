import config from "./config.json";

interface ChainConfig {
  tokenAddress: string;
  daoAddress: string;
}

interface AppConfig {
  chains: Record<string, ChainConfig>;
}

const appConfig: AppConfig = config;

export default appConfig;
