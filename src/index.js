const app = require('./app')
const request = require('request')
const fs = require('fs')
const path = require('path')
const port = process.env.PORT || 3000

const filePath = path.join(__dirname + '/../data/test.csv')

app.post('/api/upload', (req, res) =>{
    console.log('file received')
    var body = ''
    req.on('data', function(data) {
        body += data;
    });

    console.log(body)

    req.on('end', function (){
        fs.writeFileSync(filePath,body)
    });
    console.log('file uploaded')
    res.status(200).send()
})

const server = app.listen(port, () => {
    server.keepAliveTimeout = 0;
    console.log('Server is up on port ' + port)
})