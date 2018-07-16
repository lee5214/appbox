const { clientLog } = require("../services/log");
module.exports = app => {
  app.get("/welcome", (req, res) => {
    res.send("welcome");
  });

  app.post("/api/validateCityName", (req, res) => {});

  app.get("/api/clientLog", (req, res) => {
    res.json(clientLog());
  });
};
// TODO url-regex ==> done
