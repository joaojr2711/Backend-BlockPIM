const connection = require('../database/connection');

module.exports = {
  async countUsers(request, response){
    const user = await connection('users');
    const transaction = await connection('transactions');

    return response.json({ qtdUser: user.length, qtdTransaction: transaction.length});
  },

  async history(request, response){
    const transaction = await connection('transactions');

    return response.json({transaction});
  },

}
