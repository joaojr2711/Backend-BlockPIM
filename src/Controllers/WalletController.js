const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const id_user = request.headers.authorization;
    const investments_user = await connection('transactions').where('id_user', id_user).select('*');
    const wallet = await connection('walletUser').where('id_user', id_user).select('*');

    const { incomeInvestment, outcomeInvestment } = investments_user.reduce(
      (accummulator, transaction) => {
        switch (transaction.type) {
          case 'income':
            accummulator.incomeInvestment += Number(transaction.value);
            break;

          case 'outcome':
            accummulator.outcomeInvestment += Number(transaction.value);
            break;

          default:
            break;
        }

        return accummulator;
      },
      {
        incomeInvestment: 0,
        outcomeInvestment: 0,
        total: 0,
      },
    );
    const totalInvestment = incomeInvestment - outcomeInvestment;
    const { income, outcome } = wallet.reduce(
      (accummulator, transaction) => {
        switch (transaction.type) {
          case 'income':
            accummulator.income += Number(transaction.value);
            break;

          case 'outcome':
            accummulator.outcome += Number(transaction.value);
            break;

          default:
            break;
        }

        return accummulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
    const total = income - outcome;
    const totalWallet = total - totalInvestment;
    return response.json({ wallet, income, outcome, totalWallet });
  },

  async create(request, response) {
    try {
      const { value, type } = request.body;
      const id_user = request.headers.authorization;
      const hash = crypto.randomBytes(25).toString('HEX');

      const date = new Date().toLocaleString();

      await connection('walletUser').insert({
        value, date, type, id_user, hash
      });


      return response.json({ hash });
    } catch (err) {
      return response.status(400).json({ error: 'Error when making the deposit' });
    }
  },
};