const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { responseHandler, responses } = require("../utils/responseHandler");
const Users = require("../models/Users");
const Appointments = require("../models/Appointments");

exports.search = async (req, res) => {
    try {
        const likeKeywordSearch = { $regex: new RegExp(req.body.keyword, 'i') };
        const searchResults = await Users.find({
            $or: [
                { firstName: likeKeywordSearch },
                { lastName: likeKeywordSearch },
                { department: likeKeywordSearch },
                { coursesAssigned: { $elemMatch: likeKeywordSearch } },
                { officeHours: { $elemMatch: likeKeywordSearch } },
            ],
            $and: [{
                $or: [
                    { role: 'TA' },
                    { role: 'Professor' }
                ]
            }]
        }, { password: 0 });

        responseHandler(res, {
            data: searchResults,
        });
    } catch (error) {
        responseHandler(res, { response: responses.serverError, error });
    }
}

exports.create = async (req, res) => {
    try {
        // req = appointee (teacher). date, description
        await Appointments.create({
            ...req.body,
            date: new Date(req.body.date),
            appointer: req.user.id
        })
        responseHandler(res);
    } catch (error) {
        responseHandler(res, { response: responses.serverError, error });
    }
}