import jwt from "jsonwebtoken";
export const authToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("token=",token)
    if (!token) {
      res.status(200).send({
        success: false,
        message: "Invalid user",
        error,
      });
    }
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      res.status(400).send({
        success: false,
        message: "wrong token",
      });
    }
    req.userId = decoded
    console.log( decoded )
    next()
  } catch (error) {
    res.status(500).send({
      success: false,
      data: [],
      message: "Something wrong to middlewares",
      error: error.message,
    });
  }
};
