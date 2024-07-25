import express from "express";
import "colors";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import db from "./utils/db.js";
import userRouter from "./routes/userRegis.js";
import authRouter from './routes/authRouter.js'
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
// database connection
db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});    
// configure
dotenv.config();

// object
const app = express();

// middleWares

app.use(express.json());
// app.use(
//   cors({
//     origin: ["http://localhost:5173/"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

// routes
app.use("/api/v1", userRouter);
app.use("/api/v1", authRouter);
app.get("/", (req, res) => {
  res.status(200).send("<h1>Hello World!</h1>");
});

// port
const port = 8080 || process.env.PORT;

app.listen(port, () => {
  console.log(
    `Server is running at port : ${process.env.PORT}`.bgMagenta.white
  );
});
app.use((req, res, next) => {
  console.log(`Received ${req.method} request to ${req.url}`);
  next();
});
// =====================================================================================================
// import express from 'express';
// import multer from 'multer';
// import { v2 as cloudinary } from 'cloudinary';
// import dotenv from 'dotenv';
// import fs from 'fs';


// dotenv.config();

// const app = express();  
// app.use(express.json());

// cloudinary.config({ 
//   cloud_name: 'dciebjpeq', 
//   api_key: '954626436695326', 
//   api_secret: 'k_xSctKAAXwULfc2sglWUKVQVDc' 
// }); 

// // Log Cloudinary configuration to debug
// console.log('Cloudinary Config:', cloudinary.config());

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '../frontend/public/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   }
// });

// const upload = multer({ storage: storage });

// const uploadFile = async (filePath) => {
//   try {
//     const result = await cloudinary.uploader.upload(filePath, {
//       resource_type: "auto"
//     });
//     fs.unlinkSync(filePath); // Delete the file after upload
//     return result.url;
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     fs.unlinkSync(filePath); // Delete the file if upload fails
//     throw error;
//   }
// };

// export const userRegisterController = async (req, res) => {
//   try {
//     const { name, username, pass, email, phone } = req.body;
//     if (!name) return res.status(502).send({ error: "Name is required" });
//     if (!username) return res.status(502).send({ error: "Username is required" });
//     if (!pass) return res.status(502).send({ error: "Password is required" });
//     if (!email) return res.status(502).send({ error: "Email is required" });
//     if (!phone) return res.status(502).send({ error: "Phone is required" });

//     const imageUrl = await uploadFile(req.file.path);

//     const sql = "SELECT * from signup where email=?";
//     const values = [email];

//     db.query(sql, values, (err, result) => {
//       if (err) {
//         return res.status(500).send({
//           success: false,
//           message: "Internal server error",
//           err,
//         });
//       }
//       if (result.length > 0) {
//         return res.status(200).send({
//           success: true,
//           message: "User already registered",
//           result,
//         });
//       } else {
//         const sql1 = "INSERT INTO signup (name, email, pass, username, phone, images) values(?,?,?,?,?,?)";
//         const values = [name, email, pass, username, phone, imageUrl];

//         db.query(sql1, values, (inerr, result) => {
//           if (inerr) {
//             return res.status(500).send({
//               success: false,
//               message: "Invalid registration",
//               error: inerr.message,
//             });
//           }
//           if (result) {
//             return res.status(200).send({
//               success: true,
//               message: "User successfully registered",
//               result,
//             });
//           }
//         });
//       }
//     });
//   } catch (error) {
//     return res.status(500).send({
//       success: false,
//       message: "Something went wrong with the registration controller",
//       error: error.message,
//     });
//   }
// };

// app.post("/api/v1/register", upload.single('images'), userRegisterController);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
