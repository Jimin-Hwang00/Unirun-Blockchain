const express = require('express');
const router = express.Router();

const dotenv = require('dotenv');

const { getAllNfts, getNftsByOwnerAddress, updateNftOwnerAddress, getNftByTokenId } = require('../services/nft-model-service');
const { getUniversityById } = require('../services/university-model-service');
const { getUserWalletAddress } = require('../services/user-model-service');

const responseHelper = require('../helpers/response-helper');
const redisClient = require('../config/redis-client');

// NFT 아이템 전체 조회
router.get('/', async (req, res) => {
    try {
        const nfts = await getAllNfts();
    
        const promises = nfts.map(async (nft) => {
            const university = await getUniversityById(nft.universityId);
            
            return {
                tokenId: nft.tokenId,
                tokenURI: nft.metadataUri,
                tokenPrice: 100, 
                universityName: university.universityName,
                universityUrl: university.imageUrl,
            };
        });
    
        const results = await Promise.all(promises);
        return responseHelper.response(res, 200, "SUCCESS", results);
    } catch (error) {
        console.log(error);
        return responseHelper.response(res, 500, "An internal server error occurred. Please try again later.", null);
    }
});

// 사용자 소유 NFT 아이템 조회
router.get('/my-nfts', async (req, res) => {
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
 
         const nfts = await getNftsByOwnerAddress(userWalletAddress);
         
         const promises = nfts.map(async (nft) => {
            const university = await getUniversityById(nft.universityId);
            
            return {
                cardUri: nft.cardUri
            };
        });
    
        var results = await Promise.all(promises);

        // results가 0개인지 확인
        if (results.length === 0) {
            const nft = await getNftByTokenId(0);
            console.log(nft.cardUri);

            results = [{
                cardUri: nft.dataValues.cardUri
            }]

            console.log(results);
        }

        return responseHelper.response(res, 200, "SUCCESS", results);
     } catch (err) {
         // 오류 발생 시 404 에러 반환
         console.log(`Error occurred while getting token balance: ${err}`);
         return responseHelper.response(res, 404, "User data not found.", null);
     }
});

// NFT 아이템 소유자 변경
router.get('/my-nfts', async (req, res) => {
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
        const updateResult = await updateNftOwnerAddress(userId);
        console.log(`Owner of token with id ${tokenId} has changed: ${userId}`);
   
       return responseHelper.response(res, 200, "SUCCESS", results);
    } catch (err) {
        // 오류 발생 시 500 에러 반환
        console.log(`Error occurred while getting token balance: ${err}`);
        return responseHelper.response(res, 500, "An internal server error occurred. Please try again later.", null);
    }
});

module.exports = router;