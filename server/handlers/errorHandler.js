

const errorHandler = (error, req, res, next) => {

    if (error) {

        const statusCode = error.statusCode || 500;
        const errorMessage = error.message || 'Something Went Wrong';

        res.status(statusCode).json({
            status: "Failed",
            error: errorMessage
        });

    }else{

        next();
    }

}

module.exports = errorHandler;