var express = require('express'),
    http = require('http'),
    path = require('path');

var bodyParser = require('body-parser'),
    staticM = require('serve-static');

var app = express();
var router = express.Router();

// 기본 속성 설정
app.set('port', process.env.PORT || 3000);

// body-parser를 사용해 application/x-www-form-urlencode 파싱
app.use(bodyParser.urlencoded({ extended: false }));

// body-parser를 이용해 application/json 파싱
app.use(bodyParser.json());

app.use('', staticM(path.join(__dirname, 'public')));

router.route('/process/login/:name').post(function (req, res) {
    console.log('/process/login/:name 처리함');

    var paramName = req.params.name;
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;

    res.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
    res.write('<h1>Express 서버에서 응답한 결과입니다. </h1>');
    res.write('<div><p>Param name: ' + paramName + '</p></div>');
    res.write('<div><p>Param id: ' + paramId + '</p></div>');
    res.write('<div><p>Param password: ' + paramPassword + '</p></div>');
    res.write('<br><br><a href="/login2.html">로그인 페이지로 돌아가기</a>');
    res.end();
});

app.use('/', router);

app.all('*', function (req, res) {
    res.status(404).send('<h1>ERROR - 페이지를 찾을 수 없습니다.</h1>');
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('server start');
});