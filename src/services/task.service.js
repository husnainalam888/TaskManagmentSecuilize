import Task from '../models/task.model.js';

class TaskService {
  async createTask(taskData) {
    try {
      const task = await Task.create(taskData);
      return task;
    } catch (error) {
      throw error;
    }
  }

  async getTasks() {
    try {
      const tasks = await Task.findAll();
      return tasks;
    } catch (error) {
      throw error;
    }
  }

  async getTaskById(id) {
    try {
      const task = await Task.findByPk(id);
      if (!task) {
        throw new Error('Task not found');
      }
      return task;
    } catch (error) {
      throw error;
    }
  }

  async updateTask(id, updateData) {
    try {
      const task = await Task.findByPk(id);
      if (!task) {
        throw new Error('Task not found');
      }
      await task.update(updateData);
      return task;
    } catch (error) {
      throw error;
    }
  }

  async deleteTask(id) {
    try {
      const task = await Task.findByPk(id);
      if (!task) {
        throw new Error('Task not found');
      }
      await task.destroy();
    } catch (error) {
      throw error;
    }
  }
}


export default new TaskService();