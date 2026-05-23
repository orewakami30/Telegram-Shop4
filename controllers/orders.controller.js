// orders.controller.js
// Handles order creation, user orders, pending list, complete & cancel (admin)

const OrdersService = require('../services/orders.service');

module.exports = {
  // POST /orders/create
  async createOrder(req, res) {
    try {
      const { productId, quantity, price } = req.body;
      const order = await OrdersService.createOrder(req.user.id, productId, quantity, price);
      res.status(201).json(order);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // GET /orders/my
  async myOrders(req, res) {
    try {
      const orders = await OrdersService.myOrders(req.user.id);
      res.json(orders);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // GET /orders/pending (admin)
  async getPending(req, res) {
    try {
      const orders = await OrdersService.getPending();
      res.json(orders);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // PATCH /orders/complete/:id (admin)
  async completeOrder(req, res) {
    try {
      const order = await OrdersService.completeOrder(req.params.id);
      res.json(order);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // PATCH /orders/cancel/:id (admin)
  async cancelOrder(req, res) {
    try {
      const order = await OrdersService.cancelOrder(req.params.id);
      res.json(order);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};
