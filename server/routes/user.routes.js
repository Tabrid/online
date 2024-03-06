import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar , findUserById , updateBalance , updatePassword,deleteUserById} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);
router.get("/userInfo", protectRoute, findUserById);
router.put("/update-balance", protectRoute, updateBalance);
router.put("/update-password", protectRoute, updatePassword);
router.delete("/users/:userId", protectRoute, deleteUserById);

export default router;