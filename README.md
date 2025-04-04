# Blockchain Smart Contract Project (Semester 6)  

This project is a **basic blockchain smart contract implementation** developed as part of the **Semester 6** coursework. It is deployed on the **Sepolia Ethereum testnet** and integrates with a **React frontend** using the `ethers.js` library.  

The project is inspired by the **JavaScript Mastery** YouTube tutorial:  
[Watch the tutorial](https://www.youtube.com/watch?v=BDCT6TYLYdI&list=PLHe9prH0uc36t4aOKcZPhnM0Z9sbOY5Db&index=4).  

However, instead of using **Goerli faucet (deprecated)** and **Hardhat (complex for deployment)** as in the tutorial, this project utilizes **Remix IDE** for smart contract deployment on the **Sepolia testnet**. Additionally, the project structure has been modified from the original tutorial to improve maintainability.  

---

## Tech Stack  
- **Blockchain**: Ethereum (Sepolia Testnet)  
- **Smart Contract**: Solidity (Remix IDE for deployment)  
- **Frontend**: React.js  
- **Library**: ethers.js  

---

## Features  
✅ Deployable on Sepolia Testnet using Remix IDE  
✅ Smart contract interacts with React frontend via ethers.js  

---

## How to Run the Project  

### 1 Deploy Smart Contract  
1. Open [Remix IDE](https://remix.ethereum.org/).  
2. Load the smart contract (`CrowdFunding.sol`) from the project root directory.  
3. Compile and deploy the contract on **Sepolia Testnet** using your wallet (e.g., MetaMask).  
4. Copy the **deployed contract address** and save safely.  

### 2 Set Up the React Frontend  
1. Navigate to the React app directory.  
2. Create an environment variable file (`.env`) and add your contract address:
   `VITE_CONTRACT_ADDRESS=0xYourContractAddressHere`
3. Install the dependencied and start the server.
   
