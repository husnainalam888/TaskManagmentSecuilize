import taskService from "../services/task.service.js";

export const createTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const task = await taskService.createTask({
      userId,
      ...req.body,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await taskService.getTasks();
    res.json(tasks);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const getAssignedTask = async (req, res) => {
  try {
    const { id } = req.user;
    const tasks = await taskService.getAssignedTasks(id);
    res.json(tasks);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const getCreatedTask = async (req, res) => {
  try {
    const { id } = req.user;
    const tasks = await taskService.getCreatedTasks(id);
    res.json(tasks);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await taskService.getTaskById(id);
    res.json(task);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await taskService.updateTask(id, req.body);
    res.json(task);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await taskService.deleteTask(id);
    res.status(204).send();
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const assignToUser = async (req, res) => {
  try {
    const { taskId, userId } = req.body;
    const task = await taskService.assignToUser({ taskId, userId });
    res.json(task);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const getStats = async (req, res) => {
  try {
    const stats = await taskService.getStats();
    res.json({
      stats: {
        totalTasks: stats.length,
      },
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
