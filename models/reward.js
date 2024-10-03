const Sequelize = require('sequelize');

class Reward extends Sequelize.Model {
    static init(sequelize) {
        super.init({
            rewardId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true, 
                field: 'reward_id',
            },
            receiverId: {
                type: Sequelize.STRING,
                field: 'receiver_id',
            }, 
            amount: {
                type: Sequelize.INTEGER,
            }, 
            transactionHash: {
                type: Sequelize.STRING,
                field: 'transaction_hash',
            }, 
            rewardedAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
                field: 'rewarded_at',
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'Reward',
            tableName: 'reward',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}

module.exports = Reward;