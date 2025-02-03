import sequelize from "../database/db.js";
import Task from "../models/task.model.js";
import Team from "../models/team.model.js";
import TeamMember from "../models/teamMember.model.js";
import User from "../models/user.model.js";

class TaskService {
  async createTask({ userId, ...taskData }) {
    try {
      const task = await Task.create({
        createdById: userId,
        assigneedToUserId: userId,
        assignedToTeamId: taskData.teamId,
        ...taskData,
      });
      return task;
    } catch (error) {
      throw error;
    }
  }

  async getTasks() {
    try {
      const tasks = await Task.findAll({
        include: [
          {
            model: User,
            as: "createdBy",
            foreignKey: "createdById",
          },
          {
            model: User,
            as: "assignedTo",
            foreignKey: "assignedToUserId",
          },
          {
            model: Team,
            as: "assignedToTeam",
          },
        ],
      });
      return tasks;
    } catch (error) {
      throw error;
    }
  }

  async getCreatedTasks(userId) {
    try {
      const tasks = await Task.findAll({
        where: {
          createdById: userId,
        },
        include: [
          {
            model: Team,
            as: "assignedToTeam",
          },
          {
            model: User,
            as: "assignedTo",
            foreignKey: "assignedToUserId",
          },
          {
            model: User,
            as: "createdBy",
            foreignKey: "createdById",
          },
        ],
      });
      return tasks;
    } catch (error) {
      throw error;
    }
  }

  async getAssignedTasks(userId) {
    try {
      const tasks = await Task.findAll({
        where: {
          assignedToUserId: userId,
        },
        include: [
          {
            model: Team,
            as: "assignedToTeam",
          },
          {
            model: User,
            as: "assignedTo",
            foreignKey: "assignedToUserId",
          },
          {
            model: User,
            as: "createdBy",
            foreignKey: "createdById",
          },
        ],
      });
      return tasks;
    } catch (error) {
      throw error;
    }
  }

  async getTaskById(id) {
    try {
      const task = await Task.findByPk(id);
      if (!task) {
        throw new Error("Task not found");
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
        throw new Error("Task not found");
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
        throw new Error("Task not found");
      }
      await task.destroy();
    } catch (error) {
      throw error;
    }
  }

  async assignToUser({ taskId, userId }) {
    try {
      const task = await Task.findByPk(taskId);
      if (!task) {
        throw new Error("Task not found");
      }
      const isMember = await TeamMember.findOne({
        where: {
          teamId: task.assignedToTeamId,
          userId,
        },
      });

      if (!isMember) {
        throw new Error("User is not a member of the assigned team");
      }
      await task.update({ assignedToUserId: userId });
      return task;
    } catch (error) {
      throw error;
    }
  }

  async taskBelongsToUser(taskId, userId) {
    try {
      const task = await Task.findByPk(taskId);
      if (!task) {
        throw new Error("Task not found");
      }
      if (task.createdById !== userId) {
        throw new Error("Task does not belong to the user");
      }
      return true;
    } catch (error) {
      throw error;
    }
  }
}

export default new TaskService();
