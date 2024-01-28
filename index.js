const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();
const fs = require('fs')

app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(require('./routes'));

// static files
app.use(express.static(path.join(__dirname, "public")));

// listening the Server
app.listen(3000, () => {
  console.log("Server on port 3000");
});

process.on('unhandledRejection', (reason, p) => {
    console.log(' [antiCrash] :: Unhandled Rejection/Catch');
    console.log(reason, p);
});

setInterval(() => {
  try {
    fs.readdirSync('public/mp3').forEach(file => {
      fs.unlinkSync(`public/mp3/${file}`);
    });
  } catch(err) {
    console.error(err)
  }
}, 7.2e+6);