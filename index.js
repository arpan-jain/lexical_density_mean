import config from 'config';
import blocked from 'blocked';
import express from 'express';
import redirect from 'express-redirect';
import http from 'http';
import bodyParser from 'body-parser';
import routes from './routes/routes';
import requestLogger from './middlewares/req-logger';
import errorHandler from './middlewares/error-handler';


blocked((ms) => console.log('BLOCKED FOR %sms', ms || 0), { threshold: 10 });

const { port } = config;
const router = express.Router();
const app = express();
redirect(app);

const server = http.createServer(app);

app.use(bodyParser.text());
app.use(requestLogger);

app.use(router);

server.listen(port, () => {
    const serverHost = server.address().address;
    const serverPort = server.address().port;
    console.log('Server listening at http://%s:%s', serverHost, serverPort);
});

// adding routes
routes(app);

// error handling middleware
app.use(errorHandler);

// graceful shutdown
process.on('SIGINT', async () => {
    console.log('Got SIGINT');
    try {
        await (function later() {
            return new Promise((resolve) => setTimeout(resolve, 100));
        }());
    } catch (ex) {
        console.log('Exception : ', ex);
    }

    return process.exit(0);
});
