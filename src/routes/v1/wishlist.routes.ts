import * as express from "express";
import { celebrate, Joi, errors } from "celebrate";
import * as Middlewares from "../../middleware";
import {WishlistController} from "../../controllers/wishlist.controllers";

const router = express.Router();

router.get("/",
Middlewares.Auth.Authenticate,
Middlewares.Auth.UserAuth,
WishlistController.getWishlistByToken
)

router.get("/:id",
  Middlewares.Auth.Authenticate,
  Middlewares.Auth.AdminAuth,
  WishlistController.getWishlist
);

router.put("/addItemToWishlist",
  Middlewares.Auth.Authenticate,
  Middlewares.Auth.UserAuth,
  celebrate({
    body: {
      productId : Joi.string().required(),
    }
  }),
  WishlistController.addItemToWishlist
);

router.put('/removeItemFromWishlist',
Middlewares.Auth.Authenticate,
Middlewares.Auth.UserAuth,
celebrate({
  body : {
    productId : Joi.string().required()
  }
}),
WishlistController.removeItemFromWishlist
)

router.use(errors());
module.exports = router;
