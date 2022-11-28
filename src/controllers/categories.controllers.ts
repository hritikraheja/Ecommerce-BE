import { ERROR } from "../constants/error";
import { SUCCESS } from "../constants/succes";
import { Categories } from "../models/categories.model";

export const CateroriesController = {
  getAllCategories: async (req, res) => {
    try {
      let categories = await Categories.find({});
      let result = categories.map((category) => ({
        name : category.name,
        type : category.type,
        description : category.description
      }));
      res.status(SUCCESS.GET_200.code).json({ result: result });
    } catch (err) {
      res
        .status(ERROR.INTERNAL_SERVER_ERROR_500.code)
        .send(ERROR.INTERNAL_SERVER_ERROR_500);
    }
  },
  createCategory: async (req, res) => {
    var category = new Categories(req.body);
    try {
      let newCategory = await category.save();
      res
        .status(SUCCESS.POST_201.code)
        .send({ ...SUCCESS.POST_201, ...newCategory });
    } catch (e) {
      console.log(e);
      res
        .status(ERROR.INTERNAL_SERVER_ERROR_500.code)
        .send(`Database Error!${e}`);
    }
  },
  updateCategory: async (req, res) => {
    try {
      let updatedCategory = await Categories.findOneAndUpdate(
        req.body.query,
        req.body.updates
      );
      if (updatedCategory) {
        res.status(SUCCESS.PUT_200_DATA.code).send(SUCCESS.PUT_200_DATA);
      } else {
        res.status(SUCCESS.PUT_204.code).send("Category not found!");
      }
    } catch (e) {
      console.log(e);
      res
        .status(ERROR.INTERNAL_SERVER_ERROR_500.code)
        .send(ERROR.INTERNAL_SERVER_ERROR_500.message);
    }
  },
  deleteCategory: async (req, res) => {
    try {
      let deletedCategory = await Categories.deleteOne({ name: req.body.name });
      if (deletedCategory) {
        res.status(SUCCESS.DELETE_204.code).send(SUCCESS.DELETE_204);
      } else {
        res.status(SUCCESS.NOT_FOUND.code).send("BCategory not found!");
      }
    } catch (e) {
      console.log(e);
      res
        .status(ERROR.INTERNAL_SERVER_ERROR_500.code)
        .send(ERROR.INTERNAL_SERVER_ERROR_500);
    }
  },
};
