import * as express from "express";
import { celebrate, Joi, errors } from "celebrate";
import * as Middlewares from "../../middleware";
import {CateroriesController} from '../../controllers/categories.controllers'

const router = express.Router();

router.get("/", Middlewares.Auth.Authenticate, CateroriesController.getAllCategories);

router.post(
  "/create",
  Middlewares.Auth.Authenticate,
  Middlewares.Auth.AdminAuth,
  celebrate({
    body: {
      name: Joi.string().required(),
      type : Joi.string().required(),
      description : Joi.string().optional()
    },
  }),
  CateroriesController.createCategory
);

router.put(
  "/update",
  Middlewares.Auth.Authenticate,
  Middlewares.Auth.AdminAuth,
  celebrate({
    body: {
      query: Joi.object().required(),
      updates: Joi.object().required(),
    },
  }),
  CateroriesController.updateCategory
);

router.delete(
  "/delete",
  Middlewares.Auth.Authenticate,
  Middlewares.Auth.AdminAuth,
  celebrate({
    body: {
      name: Joi.string().required(),
    },
  }),
  CateroriesController.deleteCategory
);

router.use(errors());
module.exports = router;
