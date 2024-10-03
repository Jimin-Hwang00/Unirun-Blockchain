const { Sequelize, Model } = require('sequelize');

class User extends Sequelize.Model {
    static init(sequelize) {
        super.init({
            userId: {
                type: Sequelize.STRING,
                primaryKey: true,
                comment: '사용자 ID',
                field: 'user_id'
            },
            goal: {
                type: Sequelize.STRING,
                comment: '사용자의 목표'
            },
            nickName: {
                type: Sequelize.STRING,
                comment: '닉네임',
                field: 'nickname'
            },
            height: {
                type: Sequelize.FLOAT,
                comment: '신장'
            },
            weight: {
                type: Sequelize.FLOAT,
                comment: '체중'
            },
            birthYear: {
                type: Sequelize.INTEGER,
                comment: '출생 연도',
                field: 'birth_year'
            },
            gender: {
                type: Sequelize.CHAR(1),
                comment: '성별'
            },
            uniName: {
                type: Sequelize.STRING,
                comment: '대학교 이름',
                field: 'user_uni_name'
            }, 
            walletAddress: {
                type: Sequelize.STRING,
                field: 'wallet_address'
            }, 
        }, {
            sequelize,
            modelName: 'User',
            tableName: 'user',
            timestamps: false,
            underscored: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.User.hasOne(db.Wallet, { foreignKey: 'userId', sourceKey: 'userId' });
    } 
}

module.exports = User;
