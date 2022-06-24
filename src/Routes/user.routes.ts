import express, { Request, Response, NextFunction } from "express";
import aws from "aws-sdk"
import { userController } from "../Controller";
import { isAuthenticatedUser, authorizationRoles } from "../Middleware/authorization";
import {AWS_BUCKET} from "../../Config"
import multer from "multer";
import multerS3 from "multer-s3";

const awsKeys = new aws.S3({
  secretAccessKey: process.env.ACCESS_SECRET,
  accessKeyId: process.env.ACCESS_KEY,
  region: process.env.REGION,
});

const upload = multer({
  storage: multerS3({
    s3: awsKeys,
    bucket: AWS_BUCKET,
    acl: "public-read",
    key: (req, file, cb) => {
      cb(null, file.originalname)
    }
  })
})
const userRoutes = express.Router();

userRoutes.get("/profile", isAuthenticatedUser, userController.getUserDetails);
userRoutes.put(
  "/changePassword",
  isAuthenticatedUser,
  userController.updatePassword
);
userRoutes.put(
  "/edit_profile",
  isAuthenticatedUser,
  userController.updateUserDetails
);
userRoutes.put("/setProfile", isAuthenticatedUser, upload.fields([{ name: 'profile', maxCount: 1 }]), userController.setProfile);

// admin
userRoutes.get(
  "/details",
  isAuthenticatedUser,
  authorizationRoles("admin"),
  userController.getAllUserDetails
);
userRoutes.get(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizationRoles("admin"),
  userController.getSingleUser
);
userRoutes.put(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizationRoles("admin"),
  userController.updateUserRole
);
userRoutes.delete(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizationRoles("admin"),
  userController.deleteUser
);


export default userRoutes;