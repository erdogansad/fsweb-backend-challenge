require("dotenv").config();
const app = require("#api/server.js");
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`\n== API Running on port ${port} ==\n`));
