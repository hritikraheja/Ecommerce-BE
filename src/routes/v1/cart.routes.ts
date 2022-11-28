import * as express from "express";
import { celebrate, Joi, errors } from "celebrate";
import * as Middlewares from "../../middleware";
import { CartController } from "../../controllers/cart.controllers";
import { Cart } from "../../models/cart.model";

const router = express.Router();

router.get(
  "/:id",
  Middlewares.Auth.Authenticate,
  Middlewares.Auth.AdminAuth,
  CartController.getCartItems
);

router.put(
  "/addItemsToCart",
  Middlewares.Auth.Authenticate,
  Middlewares.Auth.UserAuth,
  celebrate({
    body: {
      productId : Joi.string().required(),
      quantity : Joi.number().required()
    }
  }),
  CartController.addItemToCart
);

router.put('/removeItemsFromCart',
Middlewares.Auth.Authenticate,
Middlewares.Auth.UserAuth,
celebrate({
  body : {
    productId : Joi.string().required()
  }
}),
CartController.removeItemFromCart)

router.put('/clearCart',
Middlewares.Auth.Authenticate,
Middlewares.Auth.UserAuth,
celebrate({
  body : {
  }
}),
CartController.clearCart
)

router.post('/buy',
Middlewares.Auth.Authenticate,
Middlewares.Auth.UserAuth,
celebrate({
  body : {
  }
}),
CartController.buyCartItems
)

router.use(errors());
module.exports = router;
