const connection = require("express");
const bodyparser = require("body-parser");
const app = connection();
const port = 8000;
const Cloudant = require("@cloudant/cloudant");
var url =
  "https://8ca8138b-1aac-430a-8325-3a686242a515-bluemix.cloudantnosqldb.appdomain.cloud/";
var username = "apikey-v2-1xzbb618xtgfg14nm7uasm9coajsc9dzzpg8p57atbtg";
var password = "f56766c5716a7b37a531aaa7bdb53315";
var Documents = {};
const file = require("fs");
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:4200",
  })
);
const { response } = require("express");
var urlParser = bodyparser.urlencoded({ extended: false });
app.use(connection.static("public"));
// app.get("/dashboard", function (request, response) {
//   response.json({ name: "Lakshmana pandian" });
// });
app.listen(port, (err) => {
  if (err) {
    return console.log("something bad happened", err);
  }
  console.log(`server is listening on http://localhost:${port}`);
});
var cloudant = Cloudant({ url: url, username: username, password: password });
cloudant
  .use("first-db")
  .insert({ name: "asertyuiop", id: "100" })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });