
const bcrypt = require("bcrypt");

async function gerarHash() {
  const hash = await bcrypt.hash("123456", 10);
  console.log(hash);
}

gerarHash();