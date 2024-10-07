const University = require('../models/university');
const dotenv = require('dotenv');

dotenv.config();

// id를 통한 대학 조회
async function getUniversityById(universityId) {
    try {
        const university = await University.findOne({
            where: {
                universityId: universityId
            }
        });
        return university ? university : null;
    } catch (err) {
        console.error(err);
        return false;
    }
}

module.exports = {
    getUniversityById,
}