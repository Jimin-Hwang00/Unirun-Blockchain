const express = require('express');
const router = express.Router();

const dotenv = require('dotenv');

const { getUserWalletAddress } = require('../services/user-model-service');
const { sendReward, getTokenBalance } = require('../services/token-servce');
const { createReward } = require('../services/reward-model-service');

const responseHelper = require('../helpers/response-helper');
const redisClient = require('../config/redis-client');

router.post('/reward', async (req, res) => {
    // 쿠키에서 세션 ID를 가져옵니다.
    const sessionId = req.cookies['SESSIONID'];

    // 세션 ID가 없으면 401 에러 반환
    if (!sessionId) {
        console.log('No session ID found in cookies');
        return responseHelper.response(res, 401, "No session ID. Please log in again.", null);
    }

    // 세션 ID 디코딩
    const decodedSessionId = atob(sessionId);
    console.log(`Decoded session ID: ${decodedSessionId}`);

    try {
        // Redis에서 세션 ID로 사용자 ID를 조회
        let userId = await redisClient.hGet(`spring:session:sessions:${decodedSessionId}`, 'sessionAttr:userId');

        // 사용자 ID가 없으면 401 에러 반환
        if (!userId) {
            console.log(`Invalid session for session ID: ${decodedSessionId}`);
            return responseHelper.response(res, 401, "Invalid session. Please log in again.", null);
        }

        userId = userId.replace(/"/g, '');

        console.log(`User ID found: ${userId}`);

        // 사용자 지갑 주소 가져오기
        const userWalletAddress = await getUserWalletAddress(userId);
        console.log(`User wallet address: ${userWalletAddress}`);

        // 보상 지급 요청
        const rewardResult = await sendReward(userWalletAddress);

        // 보상 지급 실패
        if (!rewardResult) {
            console.log(`Failed to send reward to wallet address: ${userWalletAddress}`);
            return responseHelper.response(res, 500, "An internal server error occurred. Please try again later.", null);
        } else {    // 보상 지급 성공
            console.log(`Reward sent successfully to wallet address: ${userWalletAddress}`);

            createReward(userId, 10, rewardResult);
            
            return responseHelper.response(res, 200, "SUCCESS", null);
        }
    } catch (error) {
        // 오류 발생 시 404 에러 반환
        console.log(`Error occurred while processing reward: ${error}`);
        return responseHelper.response(res, 404, "User data not found.", null);
    }
});

// 토큰 보유 잔액 조회
router.get('/my-tokens', async(req, res) => {
    // 쿠키에서 세션 ID를 가져옵니다.
    const sessionId = req.cookies['SESSIONID'];

    // 세션 ID가 없으면 401 에러 반환
    if (!sessionId) {
        console.log('No session ID found in cookies');
        return responseHelper.response(res, 401, "No session ID. Please log in again.", null);
    }

    // 세션 ID 디코딩
    const decodedSessionId = atob(sessionId);
    console.log(`Decoded session ID: ${decodedSessionId}`);

    try {
        // Redis에서 세션 ID로 사용자 ID를 조회
        let userId = await redisClient.hGet(`spring:session:sessions:${decodedSessionId}`, 'sessionAttr:userId');

        // 사용자 ID가 없으면 401 에러 반환
        if (!userId) {
            console.log(`Invalid session for session ID: ${decodedSessionId}`);
            return responseHelper.response(res, 401, "Invalid session. Please log in again.", null);
        }

        userId = userId.replace(/"/g, '');

        console.log(`User ID found: ${userId}`);

        // 사용자 지갑 주소 가져오기
        const userWalletAddress = await getUserWalletAddress(userId);
        console.log(`User wallet address: ${userWalletAddress}`);

        const balance = await getTokenBalance(userWalletAddress);

        if (balance != false) {
            const convertedBalance = balance / BigInt(1000000000000000000);
            return responseHelper.response(res, 200, "SUCCESS", convertedBalance.toString());
        } else {
            return responseHelper.response(res, 500, "An internal server error occurred. Please try again later.", null);
        }
    } catch (err) {
        // 오류 발생 시 404 에러 반환
        console.log(`Error occurred while getting token balance: ${err}`);
        return responseHelper.response(res, 404, "User data not found.", null);
    }
});

router.get('/my-wallet-address', async (req, res) => {
     // 쿠키에서 세션 ID를 가져옵니다.
     const sessionId = req.cookies['SESSIONID'];

     // 세션 ID가 없으면 401 에러 반환
     if (!sessionId) {
         console.log('No session ID found in cookies');
         return responseHelper.response(res, 401, "No session ID. Please log in again.", null);
     }
 
     // 세션 ID 디코딩
     const decodedSessionId = atob(sessionId);
     console.log(`Decoded session ID: ${decodedSessionId}`);
 
     try {
         // Redis에서 세션 ID로 사용자 ID를 조회
         let userId = await redisClient.hGet(`spring:session:sessions:${decodedSessionId}`, 'sessionAttr:userId');
 
         // 사용자 ID가 없으면 401 에러 반환
         if (!userId) {
             console.log(`Invalid session for session ID: ${decodedSessionId}`);
             return responseHelper.response(res, 401, "Invalid session. Please log in again.", null);
         }
 
         userId = userId.replace(/"/g, '');
 
         console.log(`User ID found: ${userId}`);
 
         // 사용자 지갑 주소 가져오기
         const userWalletAddress = await getUserWalletAddress(userId);
         console.log(`User wallet address: ${userWalletAddress}`);
 
         
         return responseHelper.response(res, 200, "SUCCESS", userWalletAddress);
     } catch (err) {
         // 오류 발생 시 404 에러 반환
         console.log(`Error occurred while getting token balance: ${err}`);
         return responseHelper.response(res, 404, "User data not found.", null);
     }
}) 

module.exports = router;