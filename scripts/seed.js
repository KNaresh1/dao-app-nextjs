const hre = require("hardhat");
const config = require("../app/config.json");

const tokens = (n) => {
  return hre.ethers.utils.parseUnits(n.toString(), "ether");
};

const ether = tokens;

// Script that gets deployed Token and DAO contract, creates DAO members, performs voting and finalizes few proposals.
// This is to generate some proposals through script instead of doing them manually through wallet, to show them on the screen
async function main() {
  console.log("Fetching accounts and network \n");

  let transaction;

  const { chainId } = await hre.ethers.provider.getNetwork();

  const [funder, investor1, investor2, investor3, recipient] =
    await hre.ethers.getSigners();

  console.log("Fetching token... \n");

  const token = await hre.ethers.getContractAt(
    "Token",
    config.chains[chainId].tokenAddress
  );
  console.log(`Token fetched: ${token.address} \n`);

  console.log("Creating DAO members by transferring tokens to them... \n");
  // Send tokens to inverstors - each ne gets 20%
  transaction = await token.transfer(investor1.address, tokens(200000));
  await transaction.wait();

  transaction = await token.transfer(investor2.address, tokens(200000));
  await transaction.wait();

  transaction = await token.transfer(investor3.address, tokens(200000));
  await transaction.wait();

  console.log("Fetching DAO... \n");

  const dao = await hre.ethers.getContractAt(
    "DAO",
    config.chains[chainId].daoAddress
  );

  console.log(`DAO fetched: ${dao.address} \n`);

  transaction = await funder.sendTransaction({
    to: dao.address,
    value: ether(1000),
  });
  await transaction.wait();
  console.log("Send funds to DAO treasury. \n");

  for (var i = 0; i < 3; i++) {
    // Create Proposal
    transaction = await dao
      .connect(investor1)
      .createProposal(`Proposal ${i + 1}`, ether(100), recipient.address);
    result = await transaction.wait();

    // Token weighted voting, need votes > 50%
    // Vote from member 1
    transaction = await dao.connect(investor1).vote(i + 1);
    result = await transaction.wait();
    // Vote from member 2
    transaction = await dao.connect(investor2).vote(i + 1);
    result = await transaction.wait();
    // Vote from member 3
    transaction = await dao.connect(investor3).vote(i + 1);
    result = await transaction.wait();

    // Finalize proposal
    transaction = await dao.connect(investor1).finalizeProposal(i + 1);
    await transaction.wait();

    console.log(`Created and Finalized proposal ${i + 1} \n`);
  }

  // One last in complete propsal with 2 votes (<50% weight) that can be  finalized through screen
  // Create Proposal
  transaction = await dao
    .connect(investor1)
    .createProposal("Proposal 4", ether(100), recipient.address);
  result = await transaction.wait();

  // Vote from member 1
  transaction = await dao.connect(investor2).vote(4);
  result = await transaction.wait();
  // Vote from member 2
  transaction = await dao.connect(investor3).vote(4);
  result = await transaction.wait();

  console.log("Finished. \n");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
