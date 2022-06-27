import express, { Request, Response, NextFunction } from "express";
import { userController } from "../Controller";
import { isAuthenticatedUser, authorizationRoles } from "../Middleware/authorization";
import multer from "multer";

// * defined filter
const fileFilter = (req: Request, file: any, cb: any) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/webp' ||
    file.mimetype === 'image/svg+xml' ||
    file.mimetype === 'image/gif' ||
    file.mimetype === 'image/avif' ||
    file.mimetype === 'image/apng' ||
    file.mimetype === 'application/octet-stream'
  ) {
    cb(null, true);
  } else {
    cb(new Error('File format should be PNG,JPG,JPEG,WEBP,SVG,XML,GIF,AVIF & APNG'), false); // if validation failed then generate error
  }
};

// *file upload using validation
const upload = multer({
  dest: "src/uploads/",
  fileFilter: fileFilter
});
const userRoutes = express.Router();

userRoutes.get("/profile", isAuthenticatedUser, userController.getUserDetails);
userRoutes.get(
  "/userProfile/:id",
  isAuthenticatedUser,
  userController.userProfile
);

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
userRoutes.put("/setProfile", isAuthenticatedUser, upload.single('profile'), userController.setProfile);

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