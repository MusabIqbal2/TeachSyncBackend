const Yup = require("yup");

exports.login = Yup.object().shape({
  email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
  password: Yup.string().max(255).required('Password is required')
});

exports.signUp = Yup.object({
  email: Yup.string().required(),
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  password: Yup.string().min(8).required(),
}).required();
