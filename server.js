const express = require('express');
const app = express();
const server = require('http').Server(app);
const port = process.env.PORT || 4000;
if (process.env.NODE_ENV === 'prod') {
    app.use(express.static('./build'));
    app.get('/*', function (req, res) {
        res.sendFile(path.resolve(__dirname, './build/index.html'));
    });
}

server.listen(port, function () {
    console.log('Running Port on http://localhost:' + port);
});
