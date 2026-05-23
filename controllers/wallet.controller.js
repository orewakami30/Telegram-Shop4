// wallet.controller.js
// Controller for wallet endpoints (no withdrawal)

const WalletService = require('../services/wallet.service');

module.exports = {
  // POST /deposit
  async deposit(req, res) {
    try {
      const { amount } = req.body;
      const tx = await WalletService.deposit(req.user.id, amount);
      res.status(201).json(tx);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // GET /balance
  async getBalance(req, res) {
    try {
      const balance = await WalletService.getBalance(req.user.id);
      res.json({ balance });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // GET /transactions
  async getTransactions(req, res) {
    try {
      const transactions = await WalletService.getTransactions(req.user.id);
      res.json(transactions);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // GET /pending (admin)
  async getPendingDeposits(req, res) {
    try {
      const pending = await WalletService.getPendingDeposits();
      res.json(pending);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // PATCH /verify/:id (admin)
  async verifyDeposit(req, res) {
    try {
      const tx = await WalletService.verifyDeposit(req.params.id);
      res.json(tx);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};
