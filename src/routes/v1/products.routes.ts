import * as express from "express";
import { celebrate, Joi, errors } from "celebrate";
import { copyObject } from "../../utils/helpers";

import { sendSuccess } from "../../utils/helpers";
import { sendError } from "../../utils/helpers";
import * as Middlewares from "../../middleware";
import { ProductsController } from "../../controllers";
import { SUCCESS, SUCCESS_MESSAGE } from "../../constants/succes";
import { PLATFORM, LOGIN_TYPE } from "../../constants/constants";

const router = express.Router();

router.get(
  "/",
  Middlewares.Auth.Authenticate,
  ProductsController.getAllProducts
);

router.get(
  "/:productId",
  Middlewares.Auth.Authenticate,
  Middlewares.Auth.AdminAuth,
  ProductsController.getProductByProductId
);

router.post('/create',
Middlewares.Auth.Authenticate,
Middlewares.Auth.AdminAuth,
celebrate({
  body : {
    name : Joi.string().required(),
    categoryId : Joi.string().required(),
    brandId : Joi.string().required(),
    description : Joi.string().optional(),
    size : Joi.number().required(),
    originalMRP : Joi.number().required(),
    vendorId : Joi.string().required()
  }
}),
ProductsController.createProduct
)

router.put('/update',
Middlewares.Auth.Authenticate,
Middlewares.Auth.AdminAuth, 
celebrate({
  body : {
    query : Joi.object().required(),
    updates : Joi.object().required()
  }
}),
ProductsController.updateProduct
)

router.delete('/delete', 
Middlewares.Auth.Authenticate,
Middlewares.Auth.AdminAuth, 
celebrate({
  body : {
    name : Joi.string().required()
  }
}),
ProductsController.deleteProduct
)

router.use(errors());
module.exports = router;
