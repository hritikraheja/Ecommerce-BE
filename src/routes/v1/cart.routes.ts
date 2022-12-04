import * as express from "express";
import { celebrate, Joi, errors } from "celebrate";
import * as Middlewares from "../../middleware";
import { CartController } from "../../controllers/cart.controllers";
import { Cart } from "../../models/cart.model";

const router = express.Router();

router.get(
  "/",
  Middlewares.Auth.Authenticate,
  Middlewares.Auth.AdminAuth,
  celebrate({
    body : {
      id : Joi.string().required()
    }
  }),
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

router.get('/estimatedOrderPrice', 
Middlewares.Auth.Authenticate,
Middlewares.Auth.UserAuth,
CartController.getEstimatedPrice
)

router.post('/applyPromocode', 
Middlewares.Auth.Authenticate,
Middlewares.Auth.UserAuth,
celebrate({
  body : {
    promocodeName : Joi.string().required()
  }
}),
CartController.applyPromocode)

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
