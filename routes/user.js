import  Express  from "express";
import { Login ,Createuser, Logout } from "../controllers/user.js";
// import { auth } from "../middlewares/auth.js"

const router=Express.Router();


router.post("/login" ,Login)
router.delete("/logout" ,Logout)
router.post("/new" ,Createuser)

export default router