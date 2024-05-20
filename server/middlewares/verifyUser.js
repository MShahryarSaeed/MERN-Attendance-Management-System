const jsonwebtoken = require("jsonwebtoken");

const verifyUser = (req, res, next) => {

    const accessToken = req.cookies.accessToken;

    if (!accessToken) {

        return res.status(401).json({
            status: "Failed",
            error: "User Not Logged In | AccessToken is Required"
        })
    }

    jsonwebtoken.verify(accessToken, process.env.SECRET, (error, user) => {

        if (error) {
            throw { message: "UnAuthorized | 401", statusCode: 401 }
        }

        req.user = user;
        next();
    }
    )

}

module.exports = verifyUser