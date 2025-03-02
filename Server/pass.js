const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const hashedPassword = bcrypt.hashSync("Parth2004", salt);
console.log("Hashed Password:", hashedPassword);