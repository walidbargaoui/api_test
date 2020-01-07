const app = require('./app')
const request = require('request')
const multer = require('multer')
const fs = require('fs')
const port = process.env.PORT || 3000

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './data')
    },
    filename: function (req, file, cb) {
        cb(null, 'test.csv')
    }
})

const upload = multer({
    storage
})

app.post('/api/upload', (req, res) =>{
    var body = ''
    req.on('data', function(data) {
        body += data;
    });

    req.on('end', function (){
        fs.writeFileSync(__dirname + './../data/test.csv',body)
    });
})

const server = app.listen(port, () => {
    server.keepAliveTimeout = 0;
    console.log('Server is up on port ' + port)
})