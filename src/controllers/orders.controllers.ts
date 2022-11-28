import { ERROR } from "../constants/error";
import { SUCCESS } from "../constants/succes";
import { Orders } from "../models/orders.model";
import { verifyJwtToken } from "../utils/helpers";

export const OrdersController = {
  getAllOrders: async (req, res) => {
    try {
      let orders = await Orders.find({})
      res.status(SUCCESS.GET_200.code).json({ result: orders });
    } catch (err) {
      res
        .status(ERROR.INTERNAL_SERVER_ERROR_500.code)
        .send(ERROR.INTERNAL_SERVER_ERROR_500);
    }
  }, 
  getMyOrders: async (req, res) => {
    let token = req.header('JWT_CERT')
    let tokenData = await verifyJwtToken(token)
    let userId = tokenData.userId
    try {
      let orders = await Orders.find({userId : userId})
      res.status(SUCCESS.GET_200.code).json({ result: orders });
    } catch (err) {
      res
        .status(ERROR.INTERNAL_SERVER_ERROR_500.code)
        .send(ERROR.INTERNAL_SERVER_ERROR_500);
    }
  },
  updateOrder : async(req, res) => {
    try {
        let updatedOrder = await Orders.findOneAndUpdate(
          req.body.query,
          req.body.updates
        );
        if (updatedOrder) {
          res.status(SUCCESS.PUT_200_DATA.code).send(SUCCESS.PUT_200_DATA);
        } else {
          res.status(SUCCESS.PUT_204.code).send("Order not found!");
        }
      } catch (e) {
        console.log(e);
        res
          .status(ERROR.INTERNAL_SERVER_ERROR_500.code)
          .send(ERROR.INTERNAL_SERVER_ERROR_500.message);
      }
  },
  deleteOrder : async(req, res) => {
    try {
        let deletedOrder = await Orders.deleteOne({ _id: req.body.orderId });
        if (deletedOrder) {
          res.status(SUCCESS.DELETE_204.code).send(SUCCESS.DELETE_204);
        } else {
          res.status(SUCCESS.NOT_FOUND.code).send("Order not found!");
        }
      } catch (e) {
        console.log(e);
        res
          .status(ERROR.INTERNAL_SERVER_ERROR_500.code)
          .send(ERROR.INTERNAL_SERVER_ERROR_500);
      }
  },
};
