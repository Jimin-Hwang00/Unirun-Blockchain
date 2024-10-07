const User = require('../models/user');
const dotenv = require('dotenv');

dotenv.config();

// userId를 토대로 사용자 지갑 주소 가져오기
async function getUserWalletAddress(userId) {
    try {
        const user = await User.findOne({
            where: { userId: userId }
        });
        return user ? user.walletAddress : null;
    } catch (err) {
        console.error(err);
        return false;
    }
}

module.exports = {
    getUserWalletAddress,
}