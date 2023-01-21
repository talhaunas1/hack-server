import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import postRoutes from "./src/routes/Posts.js";
import Post from "./src/schemas/Posts.js";
// import authRoutes from "./src/routes/Auth.js";
// connection to db
import { connect } from "./src/confiq/db.js";

const app = express();
app.use(cookieParser());
app.use(express.json());
dotenv.config();

// const corsOptions = {
//   origin: "http://localhost:3001", 
//   credentials: true,            //access-control-allow-credentials:true
//   optionSuccessStatus: 200
// }

// app.use(cors(corsOptions));

// app.use(cors({
//     credentials: true,
//     origin: "http://localhost:3001/",
//     // origin: "http://localhost:3000",
// }));

app.use(
  cors({
      credentials: true,
      origin: "http://localhost:3000",
  })
);

const port = process.env.PORT || 5000;


// app.use('/api/auth', authRoutes)
// app.use("/api/posts", postRoutes);

app.use('/', async (req, res)  => {
  try {
    const posts = await Post.aggregate([{ $sample: { size: 3 } }]);
    res.json(posts);
  } catch (error) {
    res.send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connect();
});
