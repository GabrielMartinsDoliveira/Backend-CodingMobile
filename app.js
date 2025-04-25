const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_CONNECTION = process.env.MONGO_URL;

console.log(typeof MONGO_CONNECTION);

// Middleware para parse de JSON
app.use(express.json());

app.use(cors());

// Conectando ao MongoDB
mongoose
  .connect(MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conectado ao MongoDB!");
  })
  .catch((err) => {
    console.log("Erro ao conectar ao MongoDB:", err);
  });

// Usando rotas
app.use("/api/login", authRoutes);
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
