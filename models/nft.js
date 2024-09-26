const Sequelize = require('sequelize');

class Nft extends Sequelize.Model {
    static init(sequelize) {    // 테이블에 대한 설정 
        super.init({  // 테이블 컬럼에 대한 설정
            nftId: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                comment: 'nft UUID (DB 상 ID)', 
                field: 'nft_id',
            },
            tokenId: {
                type: Sequelize.INTEGER,
                field: 'token_id',
                comment: 'nft token id',
            },
            metadata_uri: {
                type: Sequelize.STRING,
                field: 'metadata_uri',
                comment: 'nft 메타데이터 uri', 
            },
            ownerAddress: {
                type: Sequelize.STRING,
                field: 'owner_address',
                commnet: 'nft 소유자 주소',
            },
        }, {    // 테이블 자체에 대한 설정
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'Nft',
            tableName: 'nft',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }   
}

module.exports = Nft;