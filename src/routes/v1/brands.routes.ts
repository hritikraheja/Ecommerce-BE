import * as express from "express";
import { celebrate, Joi, errors } from "celebrate";
import * as Middlewares from "../../middleware";
import { BrandsController } from "../../controllers/brands.controllers";

const router = express.Router();

router.get("/", Middlewares.Auth.Authenticate, BrandsController.getAllBrands);

router.get(
  "/:name",
  Middlewares.Auth.Authenticate,
  BrandsController.getBrandByName
);

router.post(
  "/create",
  Middlewares.Auth.Authenticate,
  Middlewares.Auth.AdminAuth,
  celebrate({
    body: {
      name: Joi.string().required(),
      description: Joi.string().optional(),
      moto: Joi.string().optional(),
      email: Joi.string().required(),
      rating: Joi.number().required(),
    },
  }),
  BrandsController.createBrand
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
  BrandsController.updateBrand
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
  BrandsController.deleteBrand
);

router.use(errors());
module.exports = router;
