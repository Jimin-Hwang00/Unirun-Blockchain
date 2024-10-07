const Nft = require('../models/nft');
const dotenv = require('dotenv');

dotenv.config();

// nft 전체 데이터 조회
async function getAllNfts(tokenUri, ownerAddress, tokenId, universityId) {
    try {
        const nfts = await Nft.findAll();
        return nfts;
    } catch(err) {
        console.log(err);
        return false;
    }
}

module.exports = {
    getAllNfts,
}