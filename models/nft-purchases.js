const Sequelize = require('sequelize');

class NftPurchases extends Sequelize.Model {
    static init(sequelize) {    // 테이블에 대한 설정 
        super.init({  // 테이블 컬럼에 대한 설정
            nftPurchasesId: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                field: 'nft_purchases_id',
                comment: 'purchases ID'
            },
            purchaserId: {
                type: Sequelize.STRING,
                field: 'user_id',
            }, 
            tokenId: {
                type: Sequelize.INTEGER,
                field: 'token_id',
            }, 
            transactionHash: {
                type: Sequelize.STRING,
                field: 'transaction_hash',
            },
            purchasedAt: {
                type: Sequelize.STRING,
                field: 'purchased_at', 
            }
        }, {    // 테이블 자체에 대한 설정
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'NftPurchases',
            tableName: 'nft_purchases',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }   
}

module.exports = NftPurchases;