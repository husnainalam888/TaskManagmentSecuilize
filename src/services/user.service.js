
import User from '../models/user.model.js';

class UserService {
  async getProfile(userId) {
    try {
      const user = await User.findByPk(userId, { attributes: { exclude: ['password'] } });
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateProfile(userId, updateData) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error('User not found');
      }
      await user.update(updateData);
      return user;
    } catch (error) {
      throw error;
    }
  }
}


export default new UserService();