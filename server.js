const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const env = require("dotenv").config();
const session = require("express-session");
const flash = require("connect-flash");
const messages = require("express-messages");
const pgSession = require("connect-pg-simple")(session);
const { Pool } = require("pg"); // ✅ fixed pool import

const app = express();

// --------------------
// Database Pool (Render-compatible)
// --------------------
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// --------------------
// Controllers & Routes
// --------------------
const baseController = require("./controllers/baseController");
// const inventoryRoute = require("./routes/inventoryRoute"); // temporarily disabled
const accountRoute = require("./routes/accountRoute");
const staticRoutes = require("./routes/static");
const utilities = require("./utilities");

// --------------------
// View engine setup
// --------------------
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout");

// --------------------
// Body parsing
// --------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --------------------
// Static files
// --------------------
app.use(staticRoutes);

// --------------------
// Session Setup
// --------------------
app.use(
  session({
    store: new pgSession({
      createTableIfMissing: true,
      pool,
    }),
    secret: process.env.SESSION_SECRET || "defaultSecret",
    resave: true,
    saveUninitialized: true,
    name: "sessionId",
  })
);

// Flash messages
app.use(flash());
app.use((req, res, next) => {
  res.locals.messages = messages(req, res);
  next();
});

// --------------------
// Routes
// --------------------
app.get("/", baseController.buildHome);
app.use("/account", accountRoute);
// app.use("/inv", inventoryRoute); // disabled until ready

// --------------------
// 404 handler
// --------------------
app.use(async (req, res, next) => {
  try {
    const nav = await utilities.getNav();
    res.status(404).render("errors/404", {
      title: "404 Not Found",
      nav,
    });
  } catch (err) {
    next(err);
  }
});

// --------------------
// 500 error handler
// --------------------
app.use(async (err, req, res, next) => {
  console.error(err.stack); // log the error
  try {
    const nav = await utilities.getNav();
    res.status(500).render("errors/500", {
      title: "Server Error",
      nav,
      error: err, // pass full error object
    });
  } catch (error) {
    res.status(500).send("Critical server error");
  }
});

// --------------------
// Start server
// --------------------
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
