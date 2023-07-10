const app = require("./api/server.js");
require("dotenv").config();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`\n== API Running on port ${port} ==\n`));
