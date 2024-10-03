const { ethers } = require('ethers');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();

// Infura provider 설정
const provider = new ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/${process.env.INFURA_KEY}`);

// Unirun 블록체인 지갑
const wallet = new ethers.Wallet(process.env.UNIRUN_WALLET_KEY, provider);

// ABI 객체 만들기
const tokenABIJsonFile = fs.readFileSync('./abi/token-abi.json', 'utf-8');
const tokenABI = JSON.parse(tokenABIJsonFile);

// 스마트 컨트랙트 인스턴스 생성
const contract = new ethers.Contract(process.env.TOKEN_CONTRACT, tokenABI, wallet);

// reward 지급 (smart contract 호출)
async function sendReward(userAddress) {
    try {
        const tx = await contract.reward(userAddress);
        await tx.wait();

        return tx.hash;
    } catch (error) {
        console.log(`reward error: ${error}`)

        return false;
    }
}

// 사용자 지갑에 있는 토큰 잔액 조회
async function getTokenBalance(userAddress) {
    try {
        const balance = await contract.balanceOf(userAddress);
        console.log(`${userAddress} token balance: ${balance}`);
        return balance;
    } catch (error) {
        console.error(`Error fetching balance: ${error}`);
    }
}

module.exports = {
    sendReward, 
    getTokenBalance,
}