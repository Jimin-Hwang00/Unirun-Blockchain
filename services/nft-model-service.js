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

// 소유자 지갑 주소로 nft 데이터 조회
async function getNftsByOwnerAddress(ownerAddress) {
    try {
        const nfts = await Nft.findAll({
            where: {
                ownerAddress: ownerAddress
            }
        });
        return nfts;
    } catch(err) {
        console.log(err);
        return false;
    }
}

// tokenId를 통해 nft 소유자 변경 
async function updateNftOwnerAddress(tokenId, newOwnerAddress) {
    try {
        const nft = await Nft.update({
            ownerAddress: newOwnerAddress,
            where: {
                tokenId: tokenId
            }
        });
    } catch(err) {
        console.log(err);
        return false;
    }
}

// tokenId를 통해 nft 데이터 조회
async function getNftByTokenId(tokenId) {
    try {
        const nft = await Nft.findOne({
            where: {
                tokenId: tokenId
            }
        })
        return nft;
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = { 
    getAllNfts,
    getNftsByOwnerAddress,
    updateNftOwnerAddress,
    getNftByTokenId,
}