const jwtManager = require("../../../managers/jwtManager");
const userModel = require("../../../models/user.model");
const bcrypt = require("bcrypt");

const SignIn = async (req, res) => {

    const { email, password } = req.body;

    if (!email) throw { message: "Email is Required", statusCode: 400 }
    if (!password) throw { message: "Password is Required", statusCode: 400 }

    const existingUser = await userModel.findOne({ email: email });
    if (!existingUser) throw { message: "User Not Found", statusCode: 404 }

    const comparePassword = await bcrypt.compare(password, existingUser.password);

    if (!comparePassword) throw { message: "Incorrect Password", statusCode: 400 }

    const accessToken = jwtManager(existingUser);

    const { password: pass, ...rest } = existingUser._doc;

    res.cookie('accessToken', accessToken, { httpOnly: true }).status(200).json({
        status: "Success",
        message: "User Logged In Successfully",
        user: rest
    })



}

module.exports = SignIn;