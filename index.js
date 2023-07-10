const app = require("./api/server.js");
require("dotenv").config();

app.listen(process.env.PORT, () => console.log(`\n== API Running on port ${process.env.PORT} ==\n`));
