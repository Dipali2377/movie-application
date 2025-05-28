import express from "express";
import dontenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import multer from "multer";
import path from "path";
import connectDB from "./configure/db.js";
import movieRouter from "./routes/movieRoute.js";

dontenv.config();

const app = express(); // created express server

const PORT = process.env.PORT || 5050;
const BASE_IMAGE_URL =
  process.env.BASE_IMAGE_URL || "https://movie-application-hlut.onrender.com";

app.use(cors());

app.use(cookieParser());

app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("App is running");
// });

app.use("/movies", movieRouter);

// Image storage engine

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage }); //multer is middleware — it modifies the req object to add req.file. here the middleware we named upload

// upload endpoint
app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("movie"), (req, res) => {
  const imageHost = BASE_IMAGE_URL || `${req.protocol}://${req.get("host")}`;
  res.json({
    success: 1,
    image_url: `${imageHost}/images/${req.file.filename}`,
  });
});

app.listen(PORT, async () => {
  try {
    await connectDB();
  } catch (error) {
    console.log(error);
  }
  console.log(`Server is running on PORT ${PORT}`);
});

// connection url -   mongodb+srv://dipalim680:movie@cluster0.armi0vl.mongodb.net/
