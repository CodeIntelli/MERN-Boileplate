import { JWT_SECRET } from "../../Config";
import { UserModel } from "../Models";
import { ErrorHandler } from "../Services";
import jwt from "jsonwebtoken";

const Authentication = async (req, res, next) => {
  try {
    let authToken = req.headers.authorization;

    if (!authToken) {
      return next(
        new ErrorHandler("Please Login to access this resources", 401)
      );
    }

    const token = authToken.split(" ")[1];
    if (token === "undefined") {
      return new ErrorHandler("Please Login to access this resources", 401);
    }
    const decodeData = jwt.verify(token, JWT_SECRET);
    req.user = await UserModel.findById(decodeData.id);
    next();
  } catch (error) {
    return next(new ErrorHandler(error, 401));
  }
};

export default Authentication;
