import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  userRegisterController,
  userLoginController,
  userLogOutController,
  forgetController,
  adminDataController
} from "../controller/userController.js";

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

export default router;
