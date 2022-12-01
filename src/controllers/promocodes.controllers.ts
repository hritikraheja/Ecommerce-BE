import {Promocode} from '../models/promocode.model'
import { SUCCESS } from '../constants/succes';
import { ERROR } from '../constants/error';

export const PromocodeController = {
    getAllPromocodes : async(req, res) => {
        try {
            let promocodes = await Promocode.find({},
                 {name : 1, description : 1, discountPercentage : 1, minimumOrderValue : 1, _id : 0});
            res.status(SUCCESS.GET_200.code).json({ result: promocodes });
          } catch (err) {
            console.log(err)
            res
              .status(ERROR.INTERNAL_SERVER_ERROR_500.code)
              .send(ERROR.INTERNAL_SERVER_ERROR_500);
          }
    },
    createPromocode : async (req, res) => {
        var promocode = new Promocode(req.body);
        try {
          let newPromocode = await promocode.save();
          res
            .status(SUCCESS.POST_201.code)
            .send({ ...SUCCESS.POST_201, ...newPromocode });
        } catch (e) {
          console.log(e);
          res
            .status(ERROR.INTERNAL_SERVER_ERROR_500.code)
            .send(`Database Error!${e}`);
        }
    },
    getApplicablePromocode : async(req, res) => {
        try {
            let orderValue = req.body.orderValue
            let promocodes = await Promocode.find({minimumOrderValue : {$lt : orderValue}}, 
                {name : 1, description : 1, discountPercentage : 1, minimumOrderValue : 1, _id : 0});
            res.status(SUCCESS.GET_200.code).json({ result: promocodes });
          } catch (err) {
            console.log(err)
            res
              .status(ERROR.INTERNAL_SERVER_ERROR_500.code)
              .send(ERROR.INTERNAL_SERVER_ERROR_500);
          }
    },
    updatePromocode: async (req, res) => {
        try {
          let updatedPromocode = await Promocode.findOneAndUpdate(
            req.body.query,
            req.body.updates
          );
          if (updatedPromocode) {
            res.status(SUCCESS.PUT_200_DATA.code).send(SUCCESS.PUT_200_DATA);
          } else {
            res.status(SUCCESS.PUT_204.code).send("Promocode not found!");
          }
        } catch (e) {
          console.log(e);
          res
            .status(ERROR.INTERNAL_SERVER_ERROR_500.code)
            .send(ERROR.INTERNAL_SERVER_ERROR_500.message);
        }
      },
      deletePromocode: async (req, res) => {
        try {
          let deletedPromocode = await Promocode.deleteOne({ name: req.body.name });
          if (deletedPromocode) {
            res.status(SUCCESS.DELETE_204.code).send(SUCCESS.DELETE_204);
          } else {
            res.status(SUCCESS.NOT_FOUND.code).send("Promocode not found!");
          }
        } catch (e) {
          console.log(e);
          res
            .status(ERROR.INTERNAL_SERVER_ERROR_500.code)
            .send(ERROR.INTERNAL_SERVER_ERROR_500);
        }
      },
}