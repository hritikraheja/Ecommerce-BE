import { SUCCESS } from "../constants/succes";
import { ERROR } from "../constants/error";
import { Vendors } from "../models/vendors.model";
import { Products } from "../models/products.model";

export const VendorController = {
  getAllVendors: async (req, res) => {
    try {
      let vendors = await Vendors.find({});
      res.status(SUCCESS.GET_200.code).json({ result: vendors });
    } catch (err) {
      res
        .status(ERROR.INTERNAL_SERVER_ERROR_500.code)
        .send(ERROR.INTERNAL_SERVER_ERROR_500);
    }
  },
  getVendorByName: async (req, res) => {
    let name = req.params.name;
    try {
      let vendorsArray = await Vendors.find({ name: name });
      if (vendorsArray.length == 0) {
        return res.status(SUCCESS.NOT_FOUND.code).send(SUCCESS.NOT_FOUND);
      }
      let vendor = vendorsArray[0];
      res.send(vendor);
    } catch (err) {
      console.log(err);
      res.status(ERROR.INTERNAL_SERVER_ERROR_500.code).send("Database Error!");
    }
  },
  createVendor: async (req, res) => {
    var vendor = new Vendors(req.body);
    try {
      let newVendor = await vendor.save();
      res
        .status(SUCCESS.POST_201.code)
        .send({ ...SUCCESS.POST_201, ...newVendor });
    } catch (e) {
      console.log(e);
      res
        .status(ERROR.INTERNAL_SERVER_ERROR_500.code)
        .send(`Database Error!${e}`);
    }
  },
  updateVendor: async (req, res) => {
    try {
      let updatedVendor = await Vendors.findOneAndUpdate(
        req.body.query,
        req.body.updates
      );
      if (updatedVendor) {
        res.status(SUCCESS.PUT_200_DATA.code).send(SUCCESS.PUT_200_DATA);
      } else {
        res.status(SUCCESS.PUT_204.code).send("Vendor not found!");
      }
    } catch (e) {
      console.log(e);
      res
        .status(ERROR.INTERNAL_SERVER_ERROR_500.code)
        .send(ERROR.INTERNAL_SERVER_ERROR_500.message);
    }
  },
  deleteVendor: async (req, res) => {
    try {
      let deletedVendor = await Vendors.deleteOne({ name: req.body.name });
      if (deletedVendor) {
        res.status(SUCCESS.DELETE_204.code).send(SUCCESS.DELETE_204);
      } else {
        res.status(SUCCESS.NOT_FOUND.code).send("Vendor not found!");
      }
    } catch (e) {
      console.log(e);
      res
        .status(ERROR.INTERNAL_SERVER_ERROR_500.code)
        .send(ERROR.INTERNAL_SERVER_ERROR_500);
    }
  },
  addSupplies: async (req, res) => {
    let productId = req.body.productId;
    let quantity = req.body.quantity;
    
    let product = await Products.findOne({ _id: productId });
    if (!product) {
      return res
        .status(SUCCESS.NOT_FOUND.code)
        .json({ result: "Product not found!" });
    }

    let vendorId = product.vendorId
    let vendor = await Vendors.findOne({ _id: vendorId });
    if (!vendor) {
      return res
        .status(SUCCESS.NOT_FOUND.code)
        .json({ result: "Vendor not found!" });
    }

    let supply = vendor.supply;
    try {
      let givenProductSupply = supply.filter(
        (supply) => supply.productId == productId
      );
      if (givenProductSupply.length == 0) {
        await Vendors.findOneAndUpdate(
          { _id: vendorId },
          { $push: { supply: { productId: productId, quantity: quantity } } }
        );
      } else {
        await Vendors.findOneAndUpdate(
          { _id: vendorId, "supply.productId": productId },
          { $inc: { "supply.$.quantity": quantity } }
        );
      }
    } catch (e) {
      console.log(`Error in updating Vendors db : ${e}`);
      res
        .status(ERROR.INTERNAL_SERVER_ERROR_500.code)
        .send(ERROR.INTERNAL_SERVER_ERROR_500);
    }
    try {
      await Products.findOneAndUpdate(
        { _id: productId },
        {
          $set: { inStock: true },
          $inc: { quantityReceived: quantity },
        }
      );
    } catch (e) {
      console.log(`Error in updating Products db : ${e}`);
      res
        .status(ERROR.INTERNAL_SERVER_ERROR_500.code)
        .send(ERROR.INTERNAL_SERVER_ERROR_500);
    }
    res.status(SUCCESS.PUT_200_DATA.code).send(SUCCESS.PUT_200_DATA);
  },
  removeSupplies: async (req, res) => {
    let productId = req.body.productId;
    let quantity = req.body.quantity;
    let product = await Products.findOne({ _id: productId });
    if (!product) {
      return res.status(SUCCESS.NOT_FOUND.code).json({ result: "Product not found!" });
    }
    let vendorId = product.vendorId
    let vendor= await Vendors.findOne({ _id: vendorId });
    if (!vendor) {
      return res.status(SUCCESS.NOT_FOUND.code).json({ result: "Vendor not found!" });
    }
    let supply = vendor.supply;
    try {
      let givenProductSupply = supply.filter(
        (supply) => supply.productId == productId
      );
      if (givenProductSupply.length == 0 || quantity > givenProductSupply[0].quantity) {
        return res
          .status(ERROR.INAVLID_STATUS.code)
          .send("Quantity greater then total supply.");
      } else {
        await Vendors.findOneAndUpdate(
          { _id: vendorId, "supply.productId": productId },
          { $inc: { "supply.$.quantity": -1 * quantity } }
        );
      }
    } catch (e) {
      console.log(`Error in updating Vendors db : ${e}`);
      res
        .status(ERROR.INTERNAL_SERVER_ERROR_500.code)
        .send(ERROR.INTERNAL_SERVER_ERROR_500);
    }
    try {
      let productAvailability = product.quantityReceived - product.quantitySold
      let inStock = productAvailability > quantity;
      await Products.findOneAndUpdate(
        { _id: productId },
        {
          $inc: {
            quantityReceived: -1 * quantity,
          },
          $set: { inStock: inStock },
        }
      );
    } catch (e) {
      console.log(`Error in updating Products db : ${e}`);
      res
        .status(ERROR.INTERNAL_SERVER_ERROR_500.code)
        .send(ERROR.INTERNAL_SERVER_ERROR_500);
    }
    res.status(SUCCESS.PUT_200_DATA.code).send(SUCCESS.PUT_200_DATA);
  },
};
