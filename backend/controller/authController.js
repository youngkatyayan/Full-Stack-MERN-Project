import db from "../utils/db.js";

export const authController = async (req, res) => {
  try {
    // console.log("userId", req.userId);
    const sql = "select * from signup";
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).send({
          success: false,
          message: "Internal wrong",
          error:  err,
        });
      }
      if (result) {
        res.status(200).send({
          success: true,
          message: "User Details",
          result,
        });
      }
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something wrong auth Controller",
      error: error.message || error,
    });
  }
};
