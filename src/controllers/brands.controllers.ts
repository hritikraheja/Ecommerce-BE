import { ERROR } from "../constants/error";
import { SUCCESS } from "../constants/succes";
import { Brands } from "../models/brands.model";

export const BrandsController = {
  getAllBrands: async (req, res) => {
    try {
      let brands = await Brands.find({}, {name : 1, moto :1, description : 1, rating : 1, email : 1, _id :0});
      res.status(SUCCESS.GET_200.code).json({ result: brands });
    } catch (err) {
      res
        .status(ERROR.INTERNAL_SERVER_ERROR_500.code)
        .send(ERROR.INTERNAL_SERVER_ERROR_500);
    }
  },
  getBrandByName: async (req, res) => {
    let name = req.params.name;
    try {
      let brand = await Brands.findOne({ name: name },
        {name : 1, moto :1, description : 1, rating : 1, email : 1, _id :0});
      res.send({
        result: brand,
      });
    } catch (err) {
      console.log(err);
      res.status(ERROR.INTERNAL_SERVER_ERROR_500.code).send("Database Error!");
    }
  },
  createBrand: async (req, res) => {
    var brand = new Brands(req.body);
    try {
      let newBrand = await brand.save();
      res
        .status(SUCCESS.POST_201.code)
        .send({ ...SUCCESS.POST_201, ...newBrand });
    } catch (e) {
      console.log(e);
      res
        .status(ERROR.INTERNAL_SERVER_ERROR_500.code)
        .send(`Database Error!${e}`);
    }
  },
  updateBrand: async (req, res) => {
    try {
      let updatedBrand = await Brands.findOneAndUpdate(
        req.body.query,
        req.body.updates
      );
      if (updatedBrand) {
        res.status(SUCCESS.PUT_200_DATA.code).send(SUCCESS.PUT_200_DATA);
      } else {
        res.status(SUCCESS.PUT_204.code).send("Brand not found!");
      }
    } catch (e) {
      console.log(e);
      res
        .status(ERROR.INTERNAL_SERVER_ERROR_500.code)
        .send(ERROR.INTERNAL_SERVER_ERROR_500.message);
    }
  },
  deleteBrand: async (req, res) => {
    try {
      let deletedUser = await Brands.deleteOne({ name: req.body.name });
      if (deletedUser) {
        res.status(SUCCESS.DELETE_204.code).send(SUCCESS.DELETE_204);
      } else {
        res.status(SUCCESS.NOT_FOUND.code).send("Brand not found!");
      }
    } catch (e) {
      console.log(e);
      res
        .status(ERROR.INTERNAL_SERVER_ERROR_500.code)
        .send(ERROR.INTERNAL_SERVER_ERROR_500);
    }
  },
};
