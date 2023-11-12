const Yup = require("yup");

exports.login = Yup.object({
  email: Yup.string().required(),
  password: Yup.string().required(),
}).required();

exports.signUp = Yup.object({
  email: Yup.string().required(),
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  password: Yup.string().min(8).required(),
}).required();
