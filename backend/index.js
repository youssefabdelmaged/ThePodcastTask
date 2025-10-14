const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.listen(8000, () => {
  console.log(`✅ Server running at http://localhost:${8000}`);
});
