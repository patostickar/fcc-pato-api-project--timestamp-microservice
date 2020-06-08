const express = require("express");
const app = express();
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

app.get("/api/timestamp/:dateString?", (req, res) => {
  let dateString = req.params.dateString;
  let date;

  if (!dateString) {
    date = new Date();
  } else {
    if (isNaN(dateString)) {
      date = new Date(dateString);
    } else {
      date = new Date(parseInt(dateString));
    }
  }

  if (!date.getDate()) {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  }
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
