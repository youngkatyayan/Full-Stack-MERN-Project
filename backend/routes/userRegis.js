import express from "express";
import multer from "multer";
import path from "path";
import {
  userRegisterController,
  userLoginController,
  userLogOutController,
  forgetController,
  adminDataController, getDataController, updateController, roleController
  , createProductController, productController, updateProductController,getProductCategoryWise,getProductAsCategory
} from "../controller/userController.js";
import { authToken } from "../middlewares/authMiddlewares.js";

const router = express.Router();
const uploadDir = path.resolve('X:/Desktop/E-Commerce/backend/images');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Create the upload middleware
export const upload = multer({ storage: storage });

// Define the routes and attach the middleware/controllers
router.post("/register", upload.single("images"), userRegisterController);
router.post("/login", userLoginController);
router.get("/logout", userLogOutController);
router.put('/forget-password', forgetController);
// get data
router.get('/getadmindata/:images', adminDataController);
// const all data
router.get('/gets-alldata', authToken, getDataController)
// update dat
router.put('/update-data/:Id', authToken, updateController);
// getRole
router.get('/get-role/:encodedImages', roleController)

//get-product
router.get('/getproduct-data', productController)
// router.get('/get_product-data', product_Controller)



// create Project
// router.post('/create-product',createProductController)
router.post('/create-product', (req, res, next) => {
  console.log('Request received at /api/v1/create-product');
  createProductController(req, res, next);
})
router.put('/update-product/:Id', updateProductController)


// get product category wise
router.get('/getdata_categorywise',getProductCategoryWise)
router.post('/get-category-product',getProductAsCategory)

export default router;