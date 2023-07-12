const yup = require("yup");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getByFilter } = require("#auth/auth-modal.js");
const secret = require("#data/jwtSecret.js");

const userSchema = yup.object().shape({
  bio: yup.string().max(100, "bio must be less than 100 characters long"),
  avatar: yup.string().required("avatar is required"),
  email: yup.string().email().required("email is required"),
  password: yup
    .string()
    .required("password is required")
    .min(6, "password must be at least 6 characters long")
    .max(20, "password must be less than 20 characters long"),
  username: yup
    .string()
    .required("username is required")
    .min(3, "username must be at least 3 characters long")
    .max(20, "username must be less than 20 characters long"),
  last_name: yup.string().required("last name is required"),
  first_name: yup.string().required("first name is required"),
});

const registerController = async (req, res, next) => {
  try {
    const validate = await userSchema.validate(req.body);
    try {
      const userExists = await getByFilter({ username: req.body.username }),
        emailExists = await getByFilter({ email: req.body.email });
      if (userExists || emailExists) {
        next({ status: 409, message: `${userExists ? "username" : "email"} taken` });
      } else {
        let password = await bcryptjs.hash(validate.password, 8);
        req.user = { ...validate, password };
        next();
      }
    } catch (e) {
      next(e);
    }
  } catch (e) {
    next({ status: 400, ...e });
  }
};

const loginController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body,
      validate = username ? await getByFilter({ username }) : email ? await getByFilter({ email }) : false,
      compare = validate ? await bcryptjs.compare(password, validate.password) : false;
    if (validate && compare) {
      let data = { ...validate };
      delete data.password;
      let token = jwt.sign({ data }, secret.JWT_SECRET, { expiresIn: "7d" });
      req.user = { ...data, token };
      next();
    } else {
      next({ status: 401, message: "invalid credentials" });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = { registerController, loginController };
