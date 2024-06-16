import db from "../utils/db.js";
import jwt from "jsonwebtoken";
import { uploadFile } from "../middlewares/cloudinaryMiddlewares.js";
// register controller
export const userRegisterController = async (req, res) => {
  try {
    const { name, username, pass, email, phone } = req.body;
    if (!name) return res.status(502).send({ error: "Name is required" });
    if (!username)
      return res.status(502).send({ error: "Username is required" });
    if (!pass) return res.status(502).send({ error: "Password is required" });
    if (!email) return res.status(502).send({ error: "Email is required" });
    if (!phone) return res.status(502).send({ error: "Phone is required" });
    const imageUrl = await uploadFile(req.file.path);
    if (!imageUrl)
      return res.status(502).send({ error: "imageUrl is required" });
    const imagesName = imageUrl.url;
    console.log("ok", imagesName);
    const sql = "SELECT * FROM signup WHERE email=?";
    const values = [email];
    db.query(sql, values, (err, result) => {
      if (err) {
        return res.status(500).send({
          success: false,
          message: "Internal server error",
          error: err.message,
        });
      }
      if (result.length > 0) {
        return res.status(200).send({
          success: true,
          message: "User already registered",
          result,
        });
      } else {
        const sql1 =
          "INSERT INTO signup (name, email, pass, username, phone, images) VALUES (?, ?, ?, ?, ?, ?)";
        const values1 = [name, email, pass, username, phone, imagesName];
        db.query(sql1, values1, (inerr, result) => {
          if (inerr) {
            return res.status(500).send({
              success: false,
              message: "Invalid registration",
              error: inerr.message,
            });
          }
          if (result) {
            return res.status(200).send({
              success: true,
              message: "User successfully registered",
              result,
            });
          }
        });
      }
    });
  } catch (error) {
    console.error("Error in registration controller:", error); // Log the error
    return res.status(500).send({
      success: false,
      message: "Something went wrong with the registration controller",
      error: error.message,
    });
  }
};
// login controller
export const userLoginController = async (req, res) => {
  try {
    const { email, pass } = req.body;
    // Check if email and password are provided
    if (!email) {
      return res.status(400).send({ error: "Email is required", email });
    }
    if (!pass) {
      return res.status(400).send({ error: "Password is required" });
    }
    const sql = "SELECT * from signup where email=? and pass=?";
    db.query(sql, [email, pass], (err, result) => {
      if (err) {
        return res.status(502).send({
          success: false,
          message: "Internal server error",
          err,
        });
      }
      if (result.length > 0) {
        const user = result[0];
        const token = jwt.sign(
          { userId: user.id, userEmail: user.email },
          process.env.SECRET_KEY,
          { expiresIn: "1h" }
        );
        res
          .cookie("token", token, { httpOnly: true, secure: true })
          .status(200)
          .send({
            success: true,
            message: "Successfully logged",
            token,
            result,
          });
      } else {
        res.status(402).send({
          success: false,
          message: "Invalid user",
        });
      }
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong in login controller",
      error: error.message,
    });
  }
};

// logout controller
export const userLogOutController = async (req, res) => {
  try {
    // Clearing the token cookie
    res.clearCookie("token");

    // Sending success response
    return res.status(200).send({
      success: true,
      message: "Successfully logged out",
      data: [],
    });
  } catch (error) {
    // Sending error response
    res.status(500).send({
      success: false,
      message: "Something went wrong while logging out",
      error: error.message,
    });
  }
};

// forget controller
export const forgetController = async (req, res) => {
  try {
    const { username, pass } = req.body;
    if (!username)
      return res.status(502).send({ error: "Username is required" });
    if (!pass) return res.status(502).send({ error: "cPass is required" });
    const sql = "update signup set pass=? where username=? ";
    db.query(sql, [pass, username], (err, result) => {
      if (err) {
        res.status(502).send({
          success: false,
          message: "Internal error",
          error: err.message,
        });
      }
      res.status(200).send({
        success: true,
        message: "Password successfully changed",
        result,
      });
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something wrong to forget Password controller",
      error: error.message,
    });
  }
};

// get Data as user
// import db from 'your-database-connection-file'; // Ensure you import your database connection

export const adminDataController = async (req, res) => {
  try {
    const { images } = req.params;

    if (!images) {
      return res.status(400).send({ error: "Images parameter is required" }); // 400 is more appropriate for a bad request
    }

    const sql = "SELECT * FROM signup WHERE images = ?";

    db.query(sql, [images], (err, result) => {
      if (err) {
        return res.status(502).send({
          success: false,
          message: "Internal error",
          error: err.message,
        });
      }

      return res.status(200).send({
        success: true,
        message: "Data successfully accessed",
        result,
      });
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Something went wrong in the admin data controller",
      error: error.message,
    });
  }
};
// just get all data

export const getDataController = async (req, res) => {
  try {
    // console.log("usern Id", req.userId);
    const sql = "Select * from signup ";
    db.query(sql, (err, result) => {
      if (err) {
        return res.status(502).send({
          success: false,
          message: "Internal error",
          error: err.message,
        });
      }
      return res.status(200).send({
        success: true,
        message: "All Data accessed",
        result,
      });
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Something went wrong in the get all data controller",
      error: error.message,
    });
  }
};
// update data controller
export const updateController = async (req, res) => {
  try {
    const { Id } = req.params;
    const { name, username, pass, phone, role } = req.body;

    // Validate request body
    if (!name) return res.status(400).send({ error: "Name is required", name });
    if (!username)
      return res.status(400).send({ error: "Username is required", username });
    if (!pass)
      return res.status(400).send({ error: "Password is required", pass });
    if (!phone)
      return res.status(400).send({ error: "Phone is required", phone });
    if (!role) return res.status(400).send({ error: "Role is required", role });
    // console.log("Update request received for Id:", Id);
    // console.log("Update request body:", req.body);
    // // SQL query to update user data
    const sql =
      "UPDATE signup SET name = ?, username = ?, pass = ?, phone = ?, role = ? WHERE Id = ?";
    const values = [name, username, pass, phone, role, Id];

    db.query(sql, values, (err, result) => {
      if (err) {
        // console.error("Database error: ", err.message);
        return res.status(500).send({
          success: false,
          message: "Internal error",
          error: err.message,
        });
      }
      // if (result.affectedRows === 0) {
      //     console.warn("No rows updated, possibly invalid Id");
      //     return res.status(404).send({
      //         success: false,
      //         message: "User not found",
      //     });
      // }
      return res.status(200).send({
        success: true,
        message: "Update successful",
        result,
      });
    });
  } catch (error) {
    // console.error("Controller error: ", error.message);
    return res.status(500).send({
      success: false,
      message: "Something went wrong in the update data controller",
      error: error.message,
    });
  }
};
// get role controller
export const roleController = async (req, res) => {
  try {
    const { encodedImages } = req.params;

    if (!encodedImages) {
      return res
        .status(400)
        .send({ success: false, error: "encodedImages parameter is required" });
    }

    // Decode the encodedImages parameter
    const decodedImages = decodeURIComponent(encodedImages);

    const sql = "SELECT role FROM signup WHERE images = ?";
    db.query(sql, [decodedImages], (err, result) => {
      if (err) {
        return res.status(502).send({
          success: false,
          message: "Internal error",
          error: err.message,
        });
      }
      if (result.length === 0) {
        return res.status(404).send({
          success: false,
          message: "No data found for the provided images parameter",
        });
      }

      return res.status(200).send({
        success: true,
        message: "Data successfully accessed",
        result,
      });
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Something went wrong in the admin data controller",
      error: error.message,
    });
  }
};
