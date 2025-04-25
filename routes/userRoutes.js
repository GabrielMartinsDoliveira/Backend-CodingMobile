const express = require("express");
const {
  createUser,
  getUsers,
  getUserById,
  updatePassword,
  updateScore,
  deleteUserById,
} = require("../controller/userController");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", verifyToken, getUserById);
router.put("/:idUser", verifyToken, updatePassword);
router.put("/:id", verifyToken, updateScore);
router.delete("/:id", verifyToken, deleteUserById);

module.exports = router;
