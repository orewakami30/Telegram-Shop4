// user.controller.js
// RESTful controller for user operations

const UserService = require('../services/user.service');

module.exports = {
  // GET /me
  async getMe(req, res) {
    try {
      const user = await UserService.getUserById(req.user.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // PATCH /me
  async updateMe(req, res) {
    try {
      const user = await UserService.updateUser(req.user.id, req.body);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // GET / (admin)
  async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // GET /:id (admin)
  async getUserById(req, res) {
    try {
      const user = await UserService.getUserById(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // DELETE /:id (admin)
  async deleteUser(req, res) {
    try {
      const deleted = await UserService.deleteUser(req.params.id);
      if (!deleted) return res.status(404).json({ message: 'User not found' });
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
