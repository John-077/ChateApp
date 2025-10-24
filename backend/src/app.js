import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(express.json());// middleware to parse JSON request bodies

// routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// make ready for deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // app.get("*", (req, res) => {
  //   res.sendFile(path.join(__dirname, "..","frontend", "dist", "index.html"));
  // });

  app.use((_, res) => {
   
    res.sendFile(
      path.resolve(__dirname, "..", "frontend", "dist", "index.html")
    );
  });
}
const startServer = async () => {
  try {
    // 1. መጀመሪያ DB ጋር መገናኘት
    await connectDB();
  
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

