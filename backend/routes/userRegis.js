import express from "express";
import multer from "multer";
import path from "path";
import fs from 'fs'
import {
  userRegisterController,
  userLoginController,
  userLogOutController,
  forgetController,
  adminDataController, getDataController, updateController, roleController,getIdwiseDataController
  , createProductController, productController, updateProductController,getProductCategoryWise,getProductAsCategory
} from "../controller/userController.js";
import { authToken } from "../middlewares/authMiddlewares.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/';

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true }); 
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); 
  }
});

export const upload = multer({ storage });

// Define the route for handling registration
router.post('/register', upload.single('images'), (req, res, next) => {
  userRegisterController(req, res, next);
});

// router.post("/register", userRegisterController);
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
router.post('/get-preview-id',getIdwiseDataController)

export default router;