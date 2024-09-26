const Sequelize = require('sequelize');

const Nft = require('./nft');
const NftPurchases = require('./nft-purchases');
const Reward = require('./reward');
const University = require('./university');
const User = require('./user');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];
const db = {};

console.log(config);

let sequelize;
sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

db.sequelize = sequelize;

db.Nft = Nft;
db.NftPurchases = NftPurchases;
db.Reward = Reward;
db.University = University;
db.User = User;

Nft.init(sequelize);
NftPurchases.init(sequelize);
Reward.init(sequelize);
University.init(sequelize);
User.init(sequelize);

module.exports = db;