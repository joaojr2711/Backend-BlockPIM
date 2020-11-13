const crypto = require("crypto");
const connection = require("../database/connection");

module.exports = {
  async index(request, response) {
    const id_user = request.headers.authorization;
    const transaction = await connection("transactions")
      .where("id_user", id_user)
      .select("*");

    return response.json(transaction);
  },

  async create(request, response) {
    try {
      const { title, value, type } = request.body;
      const id_user = request.headers.authorization;
      const hash = crypto.randomBytes(25).toString("HEX");
      const date = new Date();
      const name = title;

      await connection("transactions").insert({
        name,
        value,
        date,
        type,
        id_user,
        hash,
      });

      return response.json({ hash });
    } catch (err) {
      return response
        .status(400)
        .json({ error: "Error register new transaction" });
    }
  },

  async filter(request, response) {
    const id_user = request.headers.authorization;
    const transaction = await connection("transactions")
      .where("id_user", id_user)
      .select("*");

    const total = transaction.reduce((acumulador, { name, value }) => {
      acumulador[name] = (acumulador[name] || 0) + value;
      return acumulador;
    }, {});

    const mapValue = Object.keys(total).map((name) => ({ name, value: total[name] }));

    return response.json(mapValue);
  },
};
