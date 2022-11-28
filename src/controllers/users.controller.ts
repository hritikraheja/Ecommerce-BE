import { generateRandomOtp, dateConstants } from "../utils/helpers";
import { ERROR } from "../constants/error";
import { SUCCESS } from "../constants/succes";
import { Users } from "../models/users.model";
import { ROLES } from "../constants/constants";
import * as config from "config";
import * as bcrypt from "bcrypt";
import { createJwtToken, verifyJwtToken } from "../utils/helpers";

export const UsersController = {
  loginUser: async (req, res) => {
    let plainPassword = req.body.password;
    let email = req.body.email;
    let users = await Users.find({ email: email });
    if (users.length == 0) {
      res
        .status(ERROR.USER_DOESNOT_EXISTS.code)
        .send(ERROR.USER_DOESNOT_EXISTS.message);
      return;
    }
    let user = users[0];
    let passwordMatched = await bcrypt.compare(plainPassword, user.password);
    if (!passwordMatched) {
      res
        .status(ERROR.INCORRECT_PASSWORD.code)
        .send(ERROR.INCORRECT_PASSWORD.message);
      return;
    }
    let signedToken = await createJwtToken(
      {
        userId : user._id,
        email: email,
        password: user.password,
        role: user.role,
      },
      config.get<string>("JWT_CERT")
    );
    res.status(SUCCESS.LOGIN_SUCCESSFULL.code).json({ token: signedToken });
  },
  createUser: async (req, res) => {
    let plainPassword = req.body.password;
    const encryptedPassword = await bcrypt.hash(plainPassword, 10);
    const user = new Users({
      email: req.body.email,
      password: encryptedPassword,
      userName: req.body.userName,
      role: req.body.role ? req.body.role : ROLES.USER,
    });
    try {
      let newUser = await user.save();
      res.status(SUCCESS.POST_201.code).json(newUser);
    } catch (e) {
      res
        .status(ERROR.INTERNAL_SERVER_ERROR_500.code)
        .send(`Database Error!${e}`);
    }
  },
  validateToken: async (req, res) => {
    let token = req.header('JWT_CERT')
    let tokenData = await verifyJwtToken(token)
    res.status(SUCCESS.GET_200.code).json({ status: "Token is valid", tokenDetails : {
      userId : tokenData.userId,
      email : tokenData.email,
      iat : tokenData.iat,
      role : tokenData.role == 0 ? 'User' : (tokenData.role == 1 ? 'Admin' : 'Vendor')
    } });
  },
  getUsers: async (req, res) => {
    try {
      let users = await Users.find({});
      let result = users.map((user) => ({
        email: user.email,
        name: user.name,
      }));
      res.send({ users: result });
    } catch (err) {
      res.status(500).send("Database Error : \n" + err);
    }
  },
  getUserByEmail: async (req, res) => {
    let email = req.params.email;
    try {
      let userArray = await Users.find({ email: email });
      if (userArray.length == 0) {
        return res.status(SUCCESS.NOT_FOUND.code).send(SUCCESS.NOT_FOUND);
      }
      let user = userArray[0];
      res.send({
        user: {
          email: user.email,
          userName: user.name,
          role: user.role == ROLES.ADMIN ? "Admin" : "User",
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("Database Error!");
    }
  },
  updateUser: async (req, res) => {
    try {
      var query = req.body.query;
      var fieldsToBeUpdated = req.body.updates;
      if (fieldsToBeUpdated.password) {
        let encryptedPassword = await bcrypt.hash(
          fieldsToBeUpdated.password,
          10
        );
        fieldsToBeUpdated.password = encryptedPassword;
      }
    } catch (e) {
      res.status(406).send("Invalid query or update fields");
    }
    try {
      let updatedUser = await Users.findOneAndUpdate(query, fieldsToBeUpdated);
      if (updatedUser) {
        res.status(SUCCESS.PUT_200_DATA.code).send(SUCCESS.PATCH_200_DATA);
      } else {
        res.status(SUCCESS.PUT_204.code).send("User not found!");
      }
    } catch (e) {
      res
        .status(ERROR.INTERNAL_SERVER_ERROR_500.code)
        .send(ERROR.INTERNAL_SERVER_ERROR_500.message);
    }
  },
  deleteUser: async (req, res) => {
    try {
      let email = req.body.email;
      let deletedUser = await Users.deleteOne({ email: email });
      if (deletedUser) {
        res.status(SUCCESS.DELETE_204.code).send(SUCCESS.DELETE_204)
      } else {
        res.status(SUCCESS.NOT_FOUND.code).send("User not found!");
      }
    } catch (e) {
      console.log(e)
      res.status(ERROR.INTERNAL_SERVER_ERROR_500.code).send(ERROR.INTERNAL_SERVER_ERROR_500);
    }
  },
};
