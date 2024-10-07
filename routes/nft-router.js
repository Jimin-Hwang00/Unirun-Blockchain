const express = require('express');
const router = express.Router();

const dotenv = require('dotenv');

const { getAllNfts } = require('../services/nft-model-service');
const { getUniversityById } = require('../services/university-model-service');

const responseHelper = require('../helpers/response-helper');
const redisClient = require('../config/redis-client');

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

module.exports = router;