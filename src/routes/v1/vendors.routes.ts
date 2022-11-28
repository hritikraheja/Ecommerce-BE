import * as express from "express";
import { celebrate, Joi, errors } from "celebrate";
import * as Middlewares from "../../middleware";
import { VendorController } from "../../controllers/vendors.controllers";

const router = express.Router();

router.get('/', 
Middlewares.Auth.Authenticate, 
Middlewares.Auth.AdminAuth,
VendorController.getAllVendors
)

router.get('/:name', 
Middlewares.Auth.Authenticate,
Middlewares.Auth.AdminAuth,
VendorController.getVendorByName
)

router.post('/create', 
Middlewares.Auth.Authenticate, 
Middlewares.Auth.AdminAuth,
celebrate({
    body : {
        name : Joi.string().required(),
        email : Joi.string().required(),
        supply : Joi.array().optional()
    }
}),
VendorController.createVendor
)

router.put('/update', 
Middlewares.Auth.Authenticate,
Middlewares.Auth.AdminAuth,
VendorController.updateVendor
)

router.delete('/delete', 
Middlewares.Auth.Authenticate,
Middlewares.Auth.AdminAuth,
celebrate({
    body : {
        name : Joi.string().required()
    }
}),
VendorController.deleteVendor
)

router.put('/addSupplies', 
Middlewares.Auth.Authenticate, 
Middlewares.Auth.VendorAuth,
celebrate({
    body : {
        productId : Joi.string().required(),
        quantity : Joi.number().required()
    }
}),
VendorController.addSupplies
)

router.put('/removeSupplies', 
Middlewares.Auth.Authenticate, 
Middlewares.Auth.VendorAuth,
celebrate({
    body : {
        productId : Joi.string().required(),
        quantity : Joi.number().required()
    }
}),
VendorController.removeSupplies
)


router.use(errors());
module.exports = router;
