const connectDB = require("./db");

async function seedDatabase() {
  try {
    const db = await connectDB();

    // Очистка коллекции перед добавлением новых данных
    await db.collection("tickets").deleteMany({});

    // Вставка данных
    await db.collection("tickets").insertMany(tickets);

    console.log("Database seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding the database", error);
    process.exit(1);
  }
}

seedDatabase();
