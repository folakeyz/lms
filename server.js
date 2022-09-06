const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");
const http = require("http");
const fileupload = require("express-fileupload");

dotenv.config({ path: "./config/config.env" });
connectDB();
const admin = require("./routes/admin");
const user = require("./routes/user");
const course = require("./routes/course");
const section = require("./routes/section");
const test = require("./routes/test");
const result = require("./routes/result");
const overview = require("./routes/overview");
const training = require("./routes/training");
const question = require("./routes/question");
const category = require("./routes/category");
const questionCat = require("./routes/questionCat");

const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const i = http.createServer(app);

app.use(cors());
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());

//Rate limiting
const limiter = rateLimit({
  windowMs: 20 * 60 * 1000, // 20 mins
  max: 300,
});
app.use(limiter);

//prevent http param pollution
app.use(hpp());

//file uploads
app.use(fileupload());

//Mount Routers
app.use("/api/v1/auth", admin);
app.use("/api/v1/category", category);
app.use("/api/v1/qcat", questionCat);
app.use("/api/v1/user", user);
app.use("/api/v1/course", course);
app.use("/api/v1/section", section);
app.use("/api/v1/test", test);
app.use("/api/v1/result", result);
app.use("/api/v1/overview", overview);
app.use("/api/v1/training", training);
app.use("/api/v1/question", question);

app.use(errorHandler);
//Set static folder
app.use(express.static(path.join(__dirname, "public")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

const PORT = process.env.PORT || 8000;

const server = i.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
  )
);

//Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // close Server & exit Process

  server.close(() => process.exit(1));
});
