// wallet.service.js
// Business logic for wallet operations

const db = require('../models');

class WalletService {
  static async deposit(userId, amount) {
    // Transaction model is assumed
    // Creates a pending transaction and increases balance after verification
    return await db.sequelize.transaction(async (t) => {
      // Optionally validate amount here
      const wallet = await db.Wallet.findOne({ where: { userId } }, { transaction: t });
      if (!wallet) throw new Error('Wallet not found');
      // Create a pending deposit transaction
      const transaction = await db.Transaction.create({
        userId,
        walletId: wallet.id,
        amount,
        type: 'deposit',
        status: 'pending',
      }, { transaction: t });
      return transaction;
    });
  }
  static async getBalance(userId) {
    const wallet = await db.Wallet.findOne({ where: { userId } });
    if (!wallet) throw new Error('Wallet not found');
    return wallet.balance;
  }
  static async getTransactions(userId) {
    return db.Transaction.findAll({ where: { userId }, order: [['createdAt', 'DESC']] });
  }
  static async getPendingDeposits() {
    // Admin: get all pending deposit transactions
    return db.Transaction.findAll({ where: { type: 'deposit', status: 'pending' }, order: [['createdAt', 'DESC']] });
  }
  static async verifyDeposit(id) {
    // Admin: marks deposit as verified and updates balance
    return await db.sequelize.transaction(async (t) => {
      const transaction = await db.Transaction.findOne({ where: { id, type: 'deposit', status: 'pending' } }, { transaction: t });
      if (!transaction) throw new Error('Pending deposit not found');
      const wallet = await db.Wallet.findByPk(transaction.walletId, { transaction: t });
      if (!wallet) throw new Error('Wallet not found');
      wallet.balance = parseFloat(wallet.balance) + parseFloat(transaction.amount);
      await wallet.save({ transaction: t });
      transaction.status = 'verified';
      await transaction.save({ transaction: t });
      return transaction;
    });
  }
}

module.exports = WalletService;
