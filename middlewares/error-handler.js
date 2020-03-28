export default async (err, req, res, next) => {
    try {
        console.log('err: ', err);
        if (!err.developerMessage) {
            switch (err.statusCode) {
            case 500: {
                err.developerMessage = 'Internal server error';
                break;
            }
            case 400: {
                err.developerMessage = 'Bad Request';
                break;
            }
            case 401: {
                err.developerMessage = 'Unauthorized';
                break;
            }
            case 403: {
                err.developerMessage = 'Forbidden';
                break;
            }
            case 404: {
                err.developerMessage = 'Entity not found';
                break;
            }
            case 422: {
                try {
                    if (err.details && err.details.messages && typeof err.details.messages === 'object') {
                        err.userMessage = `${Object.keys(err.details.messages)[0]} ${err.details.messages[Object.keys(err.details.messages)[0]][0]}`;
                    }
                } catch (ex) {
                    console.log('Exception : ', ex);
                }
                err.developerMessage = 'UnProcessable entity';
                break;
            }
            case 426: {
                err.developerMessage = 'Login Required';
                err.message = 'Please login to continue';
                break;
            }
            default: {
                err.statusCode = err.statusCode || 500;
                err.developerMessage = err.message || 'Unknown Error Occurred';
            }
            }
        }
        if (!err.userMessage && err.message) {
            err.userMessage = err.message;
        }
    } catch (ex) {
        return res.status(500)
            .send({
                error: {
                    statusCode: 500,
                    developerMessage: 'Internal server error',
                    userMessage: 'Internal server error',
                }
            })
            .end();
    }
    return res.status(err.statusCode || 500)
        .send({ error: err })
        .end();
};
