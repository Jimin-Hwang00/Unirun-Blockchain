const redis = require('redis');
const dotenv = require('dotenv');
dotenv.config(); // 환경 변수 설정

// Redis 클라이언트 생성
const redisClient = redis.createClient({
    url: `redis://${process.env.REDIS_ENDPOINT}`,
    password: process.env.REDIS_PASSWORD
});

// Redis 연결
redisClient.connect().catch(console.error);

module.exports = redisClient;