const express = require("express");
const {
    handleGelAllUsers, 
    handlegetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateUser,
} = require('../controllers/user.controller')

const router = express.Router();

// router.get("/", handleGelAllUsers);
// router.post("/", handleCreateUser);



router.route("/")
.get(handleGelAllUsers)
.post(handleCreateUser)





router.route("/:id")
.get(handlegetUserById)
.patch(handleUpdateUserById)
.delete(handleDeleteUserById)





module.exports = router;
