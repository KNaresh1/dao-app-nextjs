## Decentralized Autonomous Organization (D.A.O) blockchain app
- Members of D.A.O can create a proposal, vote and finalize the proposal once the vote % satisfies the weighted vote condition, the proposal is finalized or approved.

### End-to-End technology stack
1. FrontEnd: NextJS (UI and user interactions), web3-react (interact with smart contract deployed in blockchain), zustand (state management), ChakraUI (css styling)
2. BackEnd: Solidity (Implement smart contracts), Hardhat (deploy, run and test), ethers



### Hardhat commands
1. npm init
2. npm i -D hardhat 
3. npx hardhat and select Create a Javascript project
4. npx hardhat compile
5. npx hardhat test
6. npx hardhat node
7. npx hardhat run scripts/deploy.js --network localhost
8. npx hardhat run scripts/seed.js --network localhost
9. npx hardhat verify --network sepolia <api-key> <constructor-args>

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
```

