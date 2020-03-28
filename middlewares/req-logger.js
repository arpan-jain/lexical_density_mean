import util from 'util';

export default async (req, res, next) => {
    const t1 = new Date();
    // log all details of the request

    res.on('finish', () => {
        const t2 = new Date();

        console.log('/***************************');
        console.log(` Accessed URL: ${req.originalUrl}`);
        console.log(` Method: ${req.method}`);
        console.log(` Request query: ${util.inspect(req.query, false, null)}`);
        console.log(` Request body: ${util.inspect(req.body, false, null)}`);
        console.log(` Request headers: ${util.inspect(req.headers, false, null)}`);
        console.log(` sent statusCode: ${res.statusCode}`);
        console.log(' server time (in ms) : ', t2.getTime() - t1.getTime());
        console.log('******************************/');
    });
    return next();
};
