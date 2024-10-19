require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./db");
const Ticket = require("./models/Ticket");
const Order = require("./models/Order");

const MONGODB_URI = process.env.MONGODB_URI;
const SECRET_KEY = process.env.SECRET_KEY;
const PORT = process.env.PORT || 5001;

const server = http.createServer(app);
const io = new Server(server);

// Настройки для bodyParser
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

// Подключение к базе данных при старте
(async () => {
  try {
    const db = await connectDB();
    if (db) {
      console.log("Database connection established at server startup");

      const tickets = await db.collection("tickets").find().toArray();
      console.log("Tickets in the database:", tickets);
    }
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
})();

// API для получения всех билетов
app.get("/api/tickets", async (req, res) => {
  try {
    const db = await connectDB();
    const tickets = await db.collection("tickets").find().toArray();
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// API для создания заказа
app.post("/api/order", async (req, res) => {
  console.log("Received order:", req.body);
  const { tickets, userInfo } = req.body;

  if (!tickets || !userInfo) {
    return res.status(400).json({ error: "Missing order details" });
  }

  try {
    const db = await connectDB();
    await db.collection("orders").insertOne({ tickets, userInfo });
    res.json({ success: true, message: "Order placed successfully!" });

    io.emit("newOrder", { tickets, userInfo });
  } catch (err) {
    console.error("Error placing order:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// API для получения всех заказов
app.get("/api/order", async (req, res) => {
  try {
    const db = await connectDB();
    const orders = await db.collection("orders").find().toArray();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Статические файлы из клиентской части
app.use(express.static(path.join(__dirname, "..", "client", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

// Обработка подключения Socket.io
io.on("connection", socket => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Подключение к MongoDB
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Запуск сервера
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
