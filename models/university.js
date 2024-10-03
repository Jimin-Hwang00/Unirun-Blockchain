const { Sequelize, Model } = require('sequelize');

class University extends Sequelize.Model {
    static init(sequelize) {
        super.init({
            universityId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: 'university_id', 
            }, 
            universityName: {
                type: Sequelize.STRING,
                field: 'university_name', 
            }, 
            imageUrl: {
                type: Sequelize.STRING,
                field: 'image_url'
            }, 
        }, {
            sequelize,
            modelName: 'University',
            tableName: 'university',
            timestamps: false,
            underscored: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}

module.exports = University;
