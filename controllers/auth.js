const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { responseHandler, responses } = require("../utils/responseHandler");
const Users = require("../models/Users");

exports.signup = async (req, res) => {
    try {
        const { email, password, firstName, lastName, role, program, batch, coursesAssigned, officeHours, department } = req.body
        let user = await Users.findOne({ email })
        if (user) return responseHandler(res, { response: responses.userExists })

        let userDetails = { email, password: await bcrypt.hash(password, 5), firstName, lastName, role };

        if (role === 'Student' || role === 'TA') {
            userDetails = { ...userDetails, program, batch };
        }

        if (role === 'TA' || role === 'Professor') {
            userDetails = { ...userDetails, coursesAssigned, officeHours, department };
        }

        await Users.create(userDetails);
        responseHandler(res)
    } catch (error) {
        responseHandler(res, { response: responses.serverError, error })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await Users.findOne({ email })
        if (!user) return responseHandler(res, { response: responses.userNotFound })
        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) return responseHandler(res, { response: responses.invalidPassword })
        const token = jwt.sign({ email, createdAt: new Date(), admin: user.admin }, process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRY });
        responseHandler(res, {
            data: { userDetails: { ...user.toObject(), password: undefined, jwt: undefined }, token }
        })
    } catch (error) {
        responseHandler(res, { response: responses.serverError, error })
    }
}