const router = require("express").Router();
const auth = require("../middleware/auth");



const usercontroller = require("../controller/auth.controller");


router.post("/register",usercontroller.userReg);
router.post("/login",usercontroller.userlogin);
router.get("/logout", auth,usercontroller.userLogout);
router.patch("/update/:id",usercontroller.updatedata);
router.get("/getalldata",usercontroller.getalldata);
router.delete("delete/:id",usercontroller.deleteuser);

   

module.exports = router;


