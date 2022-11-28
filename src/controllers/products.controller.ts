import { ERROR } from "../constants/error";
import { SUCCESS } from "../constants/succes";
import { Products } from "../models/products.model";

export const ProductsController = {
  getAllProducts: async (req, res) => {
    try {
      let products = await Products.find({});
      let result = products.map((product) => ({
        name: product.name,
        brandId : product.brandId,
        categoryId : product.categoryId,
        size : product.size,
        originalMRP : product.originalMRP,
        description : product.description,
        inStock : product.inStock
      }));
      res.status(SUCCESS.GET_200.code).json({ result: result });
    } catch (err) {
      res
        .status(ERROR.INTERNAL_SERVER_ERROR_500.code)
        .send(ERROR.INTERNAL_SERVER_ERROR_500);
    }
  },
  getProductByProductId: async (req, res) => {
    let productId = req.params.productId;
    try {
      let productArray = await Products.find({ _id : productId });
      if (productArray.length == 0) {
        return res.status(SUCCESS.NOT_FOUND.code).send(SUCCESS.NOT_FOUND);
      }
      let product = productArray[0];
      res.send({
        result: {
          name: product.name,
          brandId : product.brandId,
          categoryId : product.categoryId,
          size : product.size,
          originalMRP : product.originalMRP,
          description : product.description,
          inStock : product.inStock
        },
      });
    } catch (err) {
      console.log(err);
      res.status(ERROR.INTERNAL_SERVER_ERROR_500.code).send("Database Error!");
    }
  },
  createProduct: async (req, res) => {
    var product = new Products(req.body);
    try {
      let newProduct = await product.save();
      res
        .status(SUCCESS.POST_201.code)
        .send({ ...SUCCESS.POST_201, ...newProduct });
    } catch (e) {
      console.log(e);
      res
        .status(ERROR.INTERNAL_SERVER_ERROR_500.code)
        .send(`Database Error!${e}`);
    }
  },
  updateProduct: async (req, res) => {
    try {
      let updatedProduct = await Products.findOneAndUpdate(
        req.body.query,
        req.body.updates
      );
      if (updatedProduct) {
        res.status(SUCCESS.PUT_200_DATA.code).send(SUCCESS.PUT_200_DATA);
      } else {
        res.status(SUCCESS.PUT_204.code).send("Product not found!");
      }
    } catch (e) {
      console.log(e);
      res
        .status(ERROR.INTERNAL_SERVER_ERROR_500.code)
        .send(ERROR.INTERNAL_SERVER_ERROR_500.message);
    }
  },
  deleteProduct: async (req, res) => {
    try {
      let deletedProduct = await Products.deleteOne({ name: req.body.name });
      if (deletedProduct) {
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
