import {getLexicalComplexity} from '../lib/models/lexical-density'


export default function routes(app) {
    app.get('/', async (req, res) => res.status(200)
        .send('Hello Stranger, How is it going?')
        .end());

    app.get('/complexity', async (req, res, next) => {
        try {
            // validation for req body
            if (req.body && req.body.length) {
                return res.status(200)
                    .send(await getLexicalComplexity(req.body, !!(req.query && req.query.mode && req.query.mode === 'verbose')))
                    .end();
            } else {
                const error = new Error('Invalid Request');
                error.statusCode = 400;
                throw error;
            }
        } catch (ex) {
            return next(ex);
        }
    });
}
