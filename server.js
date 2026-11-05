import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

// const db = new pg.Client({
//   user: "postgres",
//   host: "localhost",
//   database: "White-core-user-tests",
//   password: "200717",
//   port: 5000,
// });

// db.connect();

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("homepage.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/user-details", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  res.redirect("/select-tier-plan");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/select-tier-plan", (req, res) => {
  res.render("select-tier-plan.ejs");
});

app.post("/selected-tier-plan", (req, res) => {
  res.redirect("/user-page");
});

app.get("/user-page", (req, res) => {
  res.render("user-page.ejs");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
