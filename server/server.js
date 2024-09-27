require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http"); // Импортируем модуль HTTP
const { Server } = require("socket.io"); // Импортируем Server из socket.io
const connectDB = require("./db"); // Импорт функции подключения к базе данных
const Ticket = require("./models/Ticket");
const Order = require("./models/Order");
const MONGODB_URI = process.env.MONGODB_URI;
const SECRET_KEY = process.env.SECRET_KEY;
const server = http.createServer(app); // Создаем HTTP сервер
const io = new Server(server); // Создаем новый экземпляр socket.io и связываем его с сервером

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
const PORT = process.env.PORT || 5001; // Измените порт на 5001

app.use(bodyParser.json());

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  // Дополнительная логика обработки ошибок, если нужно
});

(async () => {
  const db = await connectDB(); // Убедимся, что сервер подключен к базе данных при старте
  if (db) {
    console.log("Database connection established at server startup");

    // Проверим данные в коллекции 'tickets'
    const tickets = await db.collection("tickets").find().toArray();
    console.log("Tickets in the database:", tickets);
  }
})();

// API routes
app.get("/api/tickets", async (req, res) => {
  try {
    const db = await connectDB();
    const tickets = await db.collection("tickets").find().toArray(); // Предполагаем, что коллекция называется 'tickets'
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/order", async (req, res) => {
  console.log("Received order:", req.body);
  const { tickets, userInfo } = req.body;
  try {
    const db = await connectDB();
    await db.collection("order").insertOne({ tickets, userInfo }); // Используем коллекцию 'orders'
    res.json({ success: true, message: "Order placed successfully!" });

    // Отправляем событие через socket.io, когда новый заказ создан
    io.emit("newOrder", { tickets, userInfo });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/order", async (req, res) => {
  try {
    const db = await connectDB();
    const orders = await db.collection("order").find().toArray(); // Используем коллекцию 'orders'
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "..", "client", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

// Обработка событий подключения socket.io
io.on("connection", socket => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
mongoose
  .connect(MONGODB_URI, { tls: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error(err));
// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
