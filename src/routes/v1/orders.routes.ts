import * as express from "express";
import { celebrate, Joi, errors } from "celebrate";
import * as Middlewares from "../../middleware";
import {OrdersController} from '../../controllers/orders.controllers'

const router = express.Router();

router.get("/getAllOrders",
Middlewares.Auth.Authenticate,
Middlewares.Auth.AdminAuth, 
celebrate({
    body: {}
}),
OrdersController.getAllOrders
);

router.get('/myOrders',
Middlewares.Auth.Authenticate,
Middlewares.Auth.UserAuth,
celebrate({
    body : {}
}),
OrdersController.getMyOrders
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
OrdersController.updateOrder
)

router.delete('/delete', 
Middlewares.Auth.Authenticate,
Middlewares.Auth.AdminAuth,
celebrate({
    body : {
        orderId : Joi.string().required()
    }
}),
OrdersController.deleteOrder
)

router.use(errors());
module.exports = router;
