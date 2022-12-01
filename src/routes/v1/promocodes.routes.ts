import * as express from "express";
import { celebrate, Joi, errors } from "celebrate";
import * as Middlewares from "../../middleware";
import { PromocodeController } from "../../controllers/promocodes.controllers"

const router = express.Router();

router.get("/",
Middlewares.Auth.Authenticate,
Middlewares.Auth.UserAuth,
PromocodeController.getAllPromocodes
);

router.get("/getApplicablePromocodes",
Middlewares.Auth.Authenticate,
Middlewares.Auth.UserAuth,
celebrate({
    body : {
        orderValue : Joi.number().required()
    }
}),
PromocodeController.getApplicablePromocode
)

router.post("/create", 
Middlewares.Auth.Authenticate,
Middlewares.Auth.AdminAuth,
celebrate({
    body : {
        name : Joi.string().required(),
        description : Joi.string().optional(),
        discountPercentage : Joi.number().required(),
        minimumOrderValue : Joi.number().required()
    }
}),
PromocodeController.createPromocode
)

router.put("/update", 
Middlewares.Auth.Authenticate,
Middlewares.Auth.AdminAuth,
celebrate({
    body: {
        query: Joi.object().required(),
        updates: Joi.object().required(),
      },
}),
PromocodeController.updatePromocode
)

router.delete('/delete', 
Middlewares.Auth.Authenticate,
Middlewares.Auth.AdminAuth,
celebrate({
    body : {
        name : Joi.string().required()
    }
}),
PromocodeController.deletePromocode
)

router.use(errors());
module.exports = router;
