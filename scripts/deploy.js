const hre = require("hardhat");

async function main() {
  const TOKEN_NAME = "Dapp Token";
  const TOKEN_SYMBOL = "DAPP";
  const MAX_SUPPLY = "1000000";
  const QUORUM = "500000000000000000000001";

  const Token = await hre.ethers.getContractFactory("Token");
  const token = await Token.deploy(TOKEN_NAME, TOKEN_SYMBOL, MAX_SUPPLY);
  await token.deployed();

  console.log(`Token deployed at: ${token.address}\n`);

  const DAO = await hre.ethers.getContractFactory("DAO");
  const dao = await DAO.deploy(token.address, QUORUM);
  await dao.deployed();

  console.log(`DAO deployed at: ${dao.address}\n`);

  
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
