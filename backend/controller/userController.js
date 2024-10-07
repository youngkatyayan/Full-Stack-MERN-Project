import db from "../utils/db.js";
import jwt from "jsonwebtoken";

import { uploadFile } from "../middlewares/cloudinaryMiddlewares.js";
// import db from '../config/dbConnection.js'; // Your DB connection

export const userRegisterController = async (req, res) => {
  try {
    const { name, username, pass, email, phone } = req.body;

    // Validate required fields
    if (!name || !username || !pass || !email || !phone) {
      return res.status(400).send({ error: "All fields are required" });
    }

    // Check if an image file was uploaded
    if (!req.file) {
      return res.status(400).send({ error: "Image file is required" });
    }

    // Upload file to Cloudinary (or any other service)
    const imageUrl = await uploadFile(req.file.path);
    if (!imageUrl || !imageUrl.url) {
      return res.status(502).send({ error: "Error uploading image" });
    }

    const imagesName = imageUrl.url;

    const sql = "SELECT * FROM signup WHERE email = ?";
    const values = [email];
    db.query(sql, values, (err, result) => {
      if (err) {
        return res.status(500).send({ success: false, message: "Database error", error: err.message });
      }

      if (result.length > 0) {
        return res.status(409).send({ success: false, message: "User already exists" });
      }

      // Insert new user into the database
      const sql1 = "INSERT INTO signup (name, email, pass, username, phone, images) VALUES (?, ?, ?, ?, ?, ?)";
      const values1 = [name, email, pass, username, phone, imagesName];

      db.query(sql1, values1, (inerr, result) => {
        if (inerr) {
          return res.status(500).send({ success: false, message: "Registration failed", error: inerr.message });
        }

        return res.status(201).send({ success: true, message: "User successfully registered", result });
      });
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
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
          .cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 1000,
          })
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

// create product controller
export const createProductController = async (req, res) => {
  try {
    const { PName, BName, category, productImage, description, price, imageName, Aprice } =
      req.body;
    const fieldData = {
      PName,
      BName,
      category,
      productImage,
      description,
      price,
      Aprice,
      imageName
    };

    for (const [filds, value] of Object.entries(fieldData)) {
      if (!value || (Array.isArray(value) && value.length === 0)) {
        return res.status(400).send({ error: `${filds} is required.` });
      }
    }

    const sql =
      "insert into product ( prname, brname,category,productImage,description,price,Aprice,image_Name) values (?,?,?,?,?,?,?,?)";
    const values = [
      PName,
      BName,
      category,
      JSON.stringify(productImage),
      description,
      price,
      Aprice,
      JSON.stringify(imageName),

    ];
    db.query(sql, values, (err, result) => {
      if (err) {
        return res.status(502).send({
          success: false,
          message: "Internal error",
          error: err.message,
        });
      }
      return res.status(201).send({
        success: true,
        message: "Created Successfully",
        result,
      });
    });


  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Something went wrong in the create product controller",
      error: error.message,
    });
  }
};

export const getProductCategoryWise = async (req, res) => {
  try {

    const sql = `SELECT DISTINCT *
FROM 
    product
GROUP BY 
    category`


    db.query(sql, (err, result) => {
      if (err) {
        return res.status(502).send({
          success: false,
          message: "Internal error",
          error: err.message,
        });
      }
      return res.status(201).send({
        success: true,
        message: "Created Successfully",
        result,
      });
    });


  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Something went wrong in the getProductCategoryWise controller",
      error: error.message,
    });
  }
};

// get product Controller

export const productController = async (req, res) => {
  try {
    const sql = 'select * from product';
    db.query(sql, (err, result) => {
      if (err) {
        res.status(404).send({
          success: false,
          message: 'Internal server Error'
        })
      }
      res.status(200).send({
        success: true,
        message: 'Access Successfully',
        result
      })
    })


  } catch (error) {
    console.log(error.message)
    res.status(500).send({
      success: false,
      message: 'Something went wrong inside productController'
    })
  }
}
// update product controller

export const updateProductController = async (req, res) => {
  try {
    const { Id } = req.params
    const { PName, BName, category, description, price, Aprice } = req.body
    const fields = { PName, BName, category, description, price, Aprice }
    for (const [key, value] of Object.entries(fields)) {
      if (!value) {
        res.status(404).send({ error: `${key} is required` })
      }
    }
    const sql = 'update product set prname=?, brname=?,category=?,description=?,price=?,Aprice=? where Id=?'
    const values = [PName, BName, category, description, price, Aprice, Id]
    db.query(sql, values, (err, result) => {
      if (err) {
        return res.status(502).send({
          success: false,
          message: "Internal error",
          error: err.message,
        });
      }
      return res.status(200).send({
        success: true,
        message: "Update Successfully",
        result,
      });
    })

  } catch (error) {
    console.log(error.message)
    res.status(500).send({
      success: false,
      message: 'Something went wrong inside updateProductController'
    })
  }
}

// get all data as category according
export const getProductAsCategory = async (req, res) => {
  try {
    const { category } = req.body
    if (!category) {
      res.status(404).send({ error: 'category is required' })
    }
    const sql = 'select * from product where category=?'
    db.query(sql, [category], (err, result) => {
      if (err) {
        return res.status(502).send({
          success: false,
          message: "Internal error",
          error: err.message,
        });
      }
      if (result.length > 0) {
        return res.status(200).send({
          success: true,
          result
        });
      }

    })

  } catch (error) {
    console.log(error.message)
    res.status(500).send({
      success: false,
      message: 'Something went wrong inside getProductAsCategory'
    })
  }
}
// get data id wise
export const getIdwiseDataController = async (req, res) => {
  try {
    const { param } = req.body
    const sql = 'select * from product where Id=?'
    db.query(sql, [param], (err, result) => {
      if (err) {
        console.log(err.message)
        res.status(502).send({
          success: false,
          message: 'Internal Server Error'
        })
      }
      res.status(200).send({
        success: true,
        message: 'Successfully Access',
        result
      })
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).send({
      success: false,
      message: 'Something went wrong inside getIdwiseDataController'
    })
  }
}