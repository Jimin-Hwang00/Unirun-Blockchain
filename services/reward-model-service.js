const Reward = require('../models/reward');
const dotenv = require('dotenv');

dotenv.config();


// reward 내역 저장
async function createReward(userId, amount, transactionHash) {
    await Reward.create({
        receiverId: userId,
        amount: amount, 
        transactionHash: transactionHash,
    })
    .then((result) => {
        return true;
    })
    .catch((err) => {
        console.log(err);
        return false;
    })
}

module.exports = {
    createReward,
}