import * as express from "express";
import { celebrate, Joi, errors } from "celebrate";
import * as Middlewares from "../../middleware";
import { UsersController } from "../../controllers/users.controller";

const router = express.Router();

router.post(
  "/login",
  Middlewares.Auth.Authenticate,
  celebrate({
    body: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  UsersController.loginUser
);

router.post(
  "/create",
  Middlewares.Auth.Authenticate,
  celebrate({
    body: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      role: Joi.number().optional(),
    },
  }),
  UsersController.createUser
);

router.get("/validateToken",
  Middlewares.Auth.Authenticate,
  Middlewares.Auth.UserAuth,
  UsersController.validateToken
);

router.get("/", Middlewares.Auth.Authenticate, UsersController.getUsers);

router.get(
  "/:email",
  Middlewares.Auth.Authenticate,
  UsersController.getUserByEmail
);

router.put(
  "/update",
  Middlewares.Auth.Authenticate,
  Middlewares.Auth.AdminAuth,
  celebrate({
    body: {
      query : Joi.object().required(),
      updates : Joi.object().required() 
    }
  }),
  UsersController.updateUser
);

router.delete(
  "/delete",
  Middlewares.Auth.Authenticate,
  Middlewares.Auth.AdminAuth,
  UsersController.deleteUser
);

router.use(errors());
module.exports = router;
