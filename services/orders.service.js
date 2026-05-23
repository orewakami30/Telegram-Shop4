// orders.service.js
// Business logic for Order operations

const db = require('../models');

class OrdersService {
  static async createOrder(userId, productId, quantity, price) {
    // Product validation is optional (can be added for strictness)
    return await db.sequelize.transaction(async (t) => {
      // Optionally: const product = await db.Product.findByPk(productId)
      const order = await db.Order.create({
        userId,
        productId,
        quantity,
        price,
        status: 'pending',
      }, { transaction: t });
      return order;
    });
  }

  static async myOrders(userId) {
    return db.Order.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
      include: [{ model: db.Product, as: 'product' }],
    });
  }

  static async getPending() {
    return db.Order.findAll({
      where: { status: 'pending' },
      order: [['createdAt', 'DESC']],
      include: [{ model: db.Product, as: 'product' }, { model: db.User, as: 'user' }],
    });
  }

  static async completeOrder(id) {
    return await db.sequelize.transaction(async (t) => {
      const order = await db.Order.findByPk(id, { transaction: t });
      if (!order || order.status !== 'pending') throw new Error('Pending order not found');
      order.status = 'completed';
      await order.save({ transaction: t });
      return order;
    });
  }

  static async cancelOrder(id) {
    return await db.sequelize.transaction(async (t) => {
      const order = await db.Order.findByPk(id, { transaction: t });
      if (!order || order.status !== 'pending') throw new Error('Pending order not found');
      order.status = 'cancelled';
      await order.save({ transaction: t });
      return order;
    });
  }
}

module.exports = OrdersService;
