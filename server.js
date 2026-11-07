import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import crypto from "crypto";
import session from "express-session";
import console from "console";

const app = express();
const port = 3000;
const member = 3000;
const silver = 6000;

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "your-super-secret-key-change-this", // Use a strong secret in production
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set to true if using HTTPS
  }),
);

app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "White-core-user-tests",
  password: "200717",
  port: 5000,
});

db.connect()
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log("Database connection error:", err));

function createUserId() {
  return crypto.randomUUID();
}

function createUserRefCode() {
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var code = "";

  for (var i = 0; i < 6; i++) {
    var randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }
  return code;
}

async function checkRefCode() {
  var refCode = createUserRefCode();
  var existingCode = await db.query(
    "SELECT referral_codes.referral_codes FROM referral_codes WHERE referral_codes = $1",
    [refCode],
  );

  if (existingCode.rows.length === 0) {
    await db.query("INSERT INTO referral_codes (referral_codes) VALUES ($1)", [
      refCode,
    ]);
    return refCode;
  } else {
    return checkRefCode();
  }
}

app.get("/", (req, res) => {
  res.render("homepage.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/user-details", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const username = req.body.username;
    const tierPlan = req.body.tier;

    if (password !== confirmPassword) {
      return res.status(400).send("Passwords do not match!");
    }

    const userId = await createUserId();
    const userRefCode = await checkRefCode();
    const registrationTime = new Date();
    await db.query(
      `INSERT INTO users 
      (user_id, email, password_hash, username, tier_plan, referral_code, created_at) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) 
      RETURNING *`,
      [
        userId,
        email,
        password,
        username,
        tierPlan,
        userRefCode,
        registrationTime,
      ],
    );
    req.session.userId = userId;

    req.session.save((err) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Could not save session.");
      }

      res.redirect("/user-page");
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Registration failed!");
  }
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post("/login", async (req, res) => {
  const reqEmail = req.body.email;
  const userIdRows = await db.query(
    `SELECT user_id FROM users WHERE email = $1`,
    [reqEmail],
  );
  const userId = userIdRows.rows[0].user_id;
  req.session.userId = userId;
  const reqPassword = req.body.password;
  const passwordToCheck = await db.query(
    `SELECT password_hash FROM users WHERE user_id = $1`,
    [userId],
  );
  const orignialPassword = passwordToCheck.rows[0].password_hash;
  if (orignialPassword === reqPassword) {
    req.session.save((err) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Login failed.");
      }
      res.redirect("/user-page");
    });
  }
});

app.get("/user-page", async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).redirect("/login");
    }

    const userResult = await db.query(
      `SELECT user_id, email, username, tier_plan, referral_code, created_at 
       FROM users WHERE user_id = $1`,
      [userId],
    );
    if (userResult.rows.length === 0) {
      return res.status(404).send("User not found.");
    }
    const currentUser = userResult.rows[0];
    console.log(currentUser);
    res.render("user-page.ejs", { currentUser: currentUser });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error loading dashboard.");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
