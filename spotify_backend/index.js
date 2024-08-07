const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const cors = require("cors");
require("dotenv").config();
const User = require("./models/User");
const AuthRoutes = require("./routes/auth");
const SongRoutes = require("./routes/song");
const PlaylistRoutes = require("./routes/playlist");

const app = express();
const port = 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure CORS options
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, // enable credentials (cookies, authorization headers)
};
app.use(cors(corsOptions));

// Connect to MongoDB
mongoose
  .connect(
    `mongodb+srv://chourikar31:${process.env.MONGO_PASSWORD}@cluster0.ac0teqc.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Passport JWT strategy
let opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "secrect",
};

passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ _id: jwt_payload.identifier }, function (err, user) {
      // done(error, doesTheUserExist)
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    });
  })
);

// Routes
app.use("/auth", AuthRoutes);
app.use("/song", SongRoutes);
app.use("/playlist", PlaylistRoutes);

// Handle OPTIONS requests
app.options("*", cors(corsOptions));

// Default route
app.get("/", (req, res) => {
  res.send("Hello Golus");
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
