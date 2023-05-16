let express = require("express");
let app = express();
let PORT = 5000;
const path = require("path");
var bcrypt = require("bcryptjs");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/views/index.html"));
});

let arr = [];
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname + "/views/signin.html"));
});
app.post("/login", async (req, res) => {
  try {
    let { Email, Password } = req.body;
    arr.map((data) => {
      res.write(data);
    });
    res.send("cool");
  } catch {
    res.status(400).send("error");
  }
});
app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname + "/views/signup.html"));
});
app.post("/signup", (req, res) => {
  let Data = async () => {
    let { Name, Number, Email, Password } = req.body;
    let password = await bcrypt.hash(Password, 10);
    arr.push({ Name, Number, Email, password });
    try {
      arr.map((data) => {
        if (data.Number === Number && data.Email === Email) {
          res.status(400).send("User alerady exist");
          res.send(console.log(arr));
        } else {
          res.send({
            Name,
            Number,
            Email,
            password,
          });
        }
      });
    } catch (error) {
      console.log(error);
      res.send("Technical issue");
    }
  };
  Data();
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/views/error.html"));
  let { Email, Password } = req.body;
  arr.map((data) => {
    if (data.Email === Email && data.Password === Password) {
      res.send("cool");
    } else {
      res.status(400).send("Error");
    }
  });
});
app.listen(PORT, () => {
  console.log(`Server started at Port ${PORT}`);
});
