import * as userService from "../services/user-services.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import {
  sendConfirmationEmail,
  sendConfirmationEmailGoogleLogin,
} from "../config/nodemailer.config.js";
import User from "../models/user.js";
import { OAuth2Client } from "google-auth-library";
const clientId = config.cliendId;

const client = new OAuth2Client(clientId);

var emailRegex =
  /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
function isEmailValid(email) {
  if (!email) return false;

  if (email.length > 254) return false;

  var valid = emailRegex.test(email);
  if (!valid) return false;

  // Further checking of some things regex can't handle
  var parts = email.split("@");
  if (parts[0].length > 64) return false;

  var domainParts = parts[1].split(".");
  if (
    domainParts.some(function (part) {
      return part.length > 63;
    })
  )
    return false;

  return true;
}

const errorhandler = (message, response) => {
  response.status(500);
  response.json({ error: message });
};

const setSuccessResponse = (data, response) => {
  response.status(200);
  response.json(data);
};

export const googleAuth = async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: clientId,
  });

  const { given_name, family_name, picture, email } = ticket.getPayload();
  let obj = {
    firstName: given_name,
    lastName: family_name,
    isVerified: true,
    profilePic: picture,
    bio: "No bio",
    createdAt: new Date(),
    updatedAt: new Date(),
    email,
    password: "Test@123",
    confirmationCode: email,
  };
  let user = await userService.search({ email });
  if (!user?._id) {
    user = await userService.create(obj);
    sendConfirmationEmailGoogleLogin(given_name, email, "Test@123");
  }

  const tokenN = jwt.sign(
    {
      email: user.email,
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      isVerified: user.isVerified,
    },
    config.secret
  );
  return res.send({ user, token: tokenN });
};

/**
 *
 * @param {Object} request
 * @param {Object} response
 * @returns
 */
export const index = async (request, response) => {
  try {
    const { email, password } = request.body;
    if (!isEmailValid(email)) {
      return errorhandler("Please enter a valid email", response);
    }
    const user = await loginUserWithEmailAndPassword(email, password);
    if (!user) {
      return errorhandler("User not found!", response);
    }
    if (!user.isVerified) {
      return errorhandler("User Not Verified!", response);
    }
    const token = jwt.sign(
      {
        email: user.email,
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        isVerified: user.isVerified,
      },
      config.secret
    );
    return response.send({ user, token });
  } catch (e) {
    errorhandler(e.message, response);
  }
};

/**
 * search a particular user in database
 * @param {Object} email
 * @param {Object} password
 * @returns
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.search({ email });
  if (!user || !(await user.comparePassword(password))) {
    return null;
  }
  return user;
};

/**
 * create new user, store it in database
 * @param {Object} request
 * @param {Object} response
 * @returns
 */
export const save = async (request, response) => {
  try {
    const token = jwt.sign({ email: request.body.email }, config.secret);
    const user = { ...request.body }; //spread operator
    user.confirmationCode = token;
    if (!isEmailValid(request.body.email)) {
      return errorhandler("Please enter a valid email", response);
    }
    await userService.create(user);
    sendConfirmationEmail(user.firstName, user.email, user.confirmationCode);
    setSuccessResponse(
      { message: "Account created successfully!!", code: 200 },
      response
    );
  } catch (e) {
    errorhandler(e.message, response);
  }
};

/**
 * get a particular user from database
 * @param {Object} request
 * @param {Object} response
 * @returns
 */
export const get = async (request, response) => {
  try {
    if (!request.user.isVerified) {
      return response.status(401).send({
        message: "Pending Account. Please Verify Your Email!",
      });
    }
    const user = await User.findOne({ email: request.user.email }).exec();
    setSuccessResponse(
      { status: request.user.isVerified, code: 200, user },
      response
    );
  } catch (e) {
    errorhandler("Something went wrong", response);
  }
};

/**
 * get all users from database
 * @param {Object} request
 * @param {Object} response
 */
export const getMembers = async (request, response) => {
  try {
    let allMember = await userService.getAll();
    allMember = allMember.filter((member) => member._id != request.user._id);
    setSuccessResponse({ code: 200, allMember }, response);
  } catch (e) {
    errorhandler("Something went wrong", response);
  }
};

/**
 * update an existing user in database
 * @param {Object} request
 * @param {Object} response
 */
export const update = async (request, response) => {
  try {
    const id = request?.params?.id;
    if (!id) {
      errorhandler("Not a valid request", response);
    }
    const user = { ...request.body, id };
    const updatedUser = await userService.update(user);
    setSuccessResponse(updatedUser, response);
  } catch (e) {
    errorhandler(e.message, response);
  }
};

/**
 * update password of a particular user
 * @param {Object} request
 * @param {Object} response
 */
export const updatePassword = async (request, response) => {
  try {
    const id = request?.params?.id;
    if (!id) {
      errorhandler("Not a valid request", response);
    }
    const user = { ...request.body, id };
    const updatedUser = await userService.updatePassword(user);
    setSuccessResponse(updatedUser, response);
  } catch (e) {
    errorhandler(e.message, response);
  }
};

/**
 * remove a particular project in database
 * @param {Object} request
 * @param {Object} response
 */
export const remove = async (request, response) => {
  try {
    const id = request?.params?.id;
    if (!id) {
      errorhandler("Not a valid request", response);
    }
    const user = await userService.remove(id);
    setSuccessResponse({ message: "User deleted succesfuly." }, response);
  } catch (e) {
    errorhandler(e.message, response);
  }
};

/**
 * verify the new user
 * @param {Object} request
 * @param {Object} response
 * @param {Object} next
 * @returns
 */
export const verifyUser = async (request, response, next) => {
  try {
    const user = await User.findOne({
      confirmationCode: request.params.confirmationCode,
    }).exec();

    if (!user) {
      return response.status(404).send({ message: "User Not found." });
    }
    user.isVerified = true;
    user.save();
    return response.status(200).send({ message: "User verified!!." });
  } catch (e) {
    errorhandler(e.message, response);
  }
};

export default {
  index: index,
  save: save,
  get: get,
  update: update,
  remove: remove,
  verifyUser: verifyUser,
  updatePassword: updatePassword,
};
