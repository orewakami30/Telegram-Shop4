// payment.controller.js
// Handles deposit, transaction history, pending, and verify endpoints.

const PaymentService = require('../services/payment.service');

module.exports = {
  // POST /payment/deposit
  async deposit(req, res) {
    try {
      const { amount, walletId } = req.body;
      const payment = await PaymentService.deposit(req.user.id, walletId, amount);
      res.status(201).json(payment);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // GET /payment/history
  async getHistory(req, res) {
    try {
      const history = await PaymentService.getHistory(req.user.id);
      res.json(history);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // GET /payment/pending (admin)
  async getPending(req, res) {
    try {
      const pending = await PaymentService.getPending();
      res.json(pending);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // PATCH /payment/verify/:id (admin)
  async verifyDeposit(req, res) {
    try {
      const payment = await PaymentService.verifyDeposit(req.params.id);
      res.json(payment);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};
