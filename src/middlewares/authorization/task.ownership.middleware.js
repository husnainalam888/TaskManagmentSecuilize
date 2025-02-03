import { Task } from "../../models/index.js";

export const taskOwnershipMiddleware = async (req, res, next) => {
  try {
    const taskId = req.params?.id || req.body?.taskId;
    const { id } = req.user;

    const task = await Task.findOne({
      where: {
        id: taskId,
        createdById: id,
      },
    });

    if (!task) {
      return res.status(403).json({ message: "You do not own this task" });
    }
    next();
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
