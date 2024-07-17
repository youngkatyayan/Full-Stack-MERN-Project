import express from "express";
import multer from "multer";
import path from "path";
import {
  userRegisterController,
  userLoginController,
  userLogOutController,
  forgetController,
  adminDataController,getDataController,updateController,roleController
  ,createProductController
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
router.get('/gets-alldata',authToken,getDataController)
// update dat
router.put('/update-data/:Id',authToken, updateController);
// getRole
router.get('/get-role/:encodedImages',roleController)



// create Project
router.post('create-product',createProductController)
export default router;