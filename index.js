// VARIÁVEIS PARA SERVIR COMO PARÂMETRO P/ RENDERIZAÇÃO DE COMPONENTES
// REPETITIVOS COM O NOME OU ALGO ESPECIFICO DE CLIENTES DESSE TIPO (NO
// CASO, RESTAURANTES)
const nomeLoja = "Pizza Place";
let storeIsOpen = false;

// Modules import
const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");

const app = express();

// Configurando app para trabalhar com websockets
const server = http.createServer(app);
const io = socketio(server);

// Setando comportamento dos websockets
io.on("connection", (socket) => {
  socket.emit("message", "bem-vindo!");
  socket.emit("checkDOMStatus", storeIsOpen);

  socket.on("updateStatusStore", () => {
    console.log("update status signal catched!");
    storeIsOpen ? (storeIsOpen = false) : (storeIsOpen = true);
    io.emit("checkDOMStatus", storeIsOpen);
  });
});

// ------ authentication section --------

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");

const initializePassport = require("./passport-config");
initializePassport(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);

// const users = []
const users = [
  {
    id: Date.now().toString(),
    name: "r",
    email: "r@r",
    password: "r",
  },
];

app.set("view-engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

app.get("/adm", checkAuthenticated, (req, res) => {
  res.render("adm.ejs", { name: req.user.name, nomeLoja });
});

app.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("login.ejs");
});

app.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/adm",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

app.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("register.ejs");
});

app.post("/register", checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    res.redirect("/login");
  } catch {
    res.redirect("/register");
  }
});

app.delete("/logout", (req, res) => {
  req.logOut();
  res.redirect("/login");
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/adm");
  }
  next();
}

function consoleLog(req, res, next) {
  try {
    console.log(users);
    console.log(req.body.id, req.body.name, req.body.email, req.body.password);
  } catch (error) {
    console.log(error);
  }
  next();
}

// ------ admin section -------

// app.post('/toggleOpenClose', (req, res) => {
//     storeIsOpen? storeIsOpen = false : storeIsOpen = true;
//     updateStatusStore(storeIsOpen);
//     req.
// })

// ----------- end auth sect -------------

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Members API Routes
//app.use('/api/members', require('./routes/api/members'));

app.get("/", (req, res) => {
  res.redirect("/index.html");
});

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
