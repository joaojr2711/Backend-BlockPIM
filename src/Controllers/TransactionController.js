const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const id_user = request.headers.authorization;
    const transaction = await connection('transactions').where('id_user', id_user).select('*');

    return response.json(transaction);
  },

  async create(request, response) {
    try {
      const { title, value } = request.body;
      const id_user = request.headers.authorization;
      const hash = crypto.randomBytes(25).toString('HEX');
      const date = new Date();

      await connection('transactions').insert({
        title, value, date, id_user, hash
      });

      return response.json({ hash });
    } catch (err) {
      return response.status(400).json({ error: 'Error register new transaction' });
    }
  },
};