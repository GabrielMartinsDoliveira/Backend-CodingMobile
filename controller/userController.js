const User = require("../models/user");

const createUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const verifyUser = await User.findOne({ email });
    if (verifyUser) {
      return res.status(400).json({ message: "Email already registered" });
    }
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password and confirmation do not match" });
    }
    const user = new User({ name, email, password, confirmPassword });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(400).json({ message: "Usuários não encontrados" });
    }
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updatePassword = async (req, res) => {
  try {
    const id = req.params.id;
    const { senha } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { senha },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const updateScore = async (req, res) => {
  try {
    const id = req.params.id;
    const { score } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { score },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params.id;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser)
      return res.status(404).json({ message: "Usuário não encotrado" });

    res.status(200).json({ message: "Usuário excluído" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updatePassword,
  updateScore,
  deleteUserById,
};
