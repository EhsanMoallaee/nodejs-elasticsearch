const http = require('http');
const { app } = require('./app.js');

class Application {
    
    constructor() {
        this.setupExpressServer();
    }

    //Express
    setupExpressServer() {
        const PORT = process.env.PORT || 3000;
        const BASE_URL = process.env.BASE_URL;
        const server = http.createServer(app);

        server.listen(PORT , () => {
            console.log(`Server running on : \x1b[94m ${BASE_URL}:${PORT} \x1b[0m`);
        })
    }

}

module.exports = {
    Application,
}