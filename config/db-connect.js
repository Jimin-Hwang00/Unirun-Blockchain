const {sequelize} = require('./models');    // 폴더 내의 index.js 파일은 require할 때 이름 생략 가능

sequelize.sync( {force: false} )    // force 옵션을 true로 하면 서버를 실행할 때마다 테이블 재생성 
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    })