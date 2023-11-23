const errorMiddleware = (err, req, res, next) =>{
    const status = res.statusCode ? res.statusCode : 400;
    res.status(status);
    res.json({
        middleware: "Error - middleware",
        message: err.message,
        completeError: err,
        status: status,
        stack: err.stack,        
    })
}

module.exports = errorMiddleware;