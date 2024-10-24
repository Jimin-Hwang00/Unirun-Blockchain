const { DateTime } = require('luxon');

module.exports = {
    response: (res, status, msg, data) => {
        const sendTime = DateTime.now()
            .setZone('Asia/Seoul')  
            .toFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZZ'[Asia/Seoul]'"); 

        res.status(status).json({
            status: status,
            message: msg, 
            data: data,
            sendTime: sendTime
        });
    }
}