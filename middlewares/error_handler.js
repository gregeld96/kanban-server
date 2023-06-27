module.exports = function (err, req, res, next) {
    let statusCode = 500;
    let errorMessage = [];
    const { error } = err;

    console.log(error);

    switch (error.name) {
        case "SequelizeUniqueConstraintError":
        case "SequelizeValidationError":
        case "ValidationErrorItem":
            statusCode = 422;
            error.errors.forEach(errData => {
                errorMessage.push(errData.message);
            });
            break;
        case "ValidationError":
            statusCode = 400;
            errorMessage.push(error.details[0].message.replace(/"/g, ''));
            break;
        case "JsonWebTokenError":
            statusCode = 401;
            errorMessage.push('Token invalid');
            break;
        default:
            console.log(error.message);
            let message = error.message || 'Internal Server Error';
            errorMessage.push(message);
            statusCode = error.status || statusCode
            break;
    }

    res.status(statusCode).json({ 
        success: false,
        message: errorMessage.toString() 
    });
}