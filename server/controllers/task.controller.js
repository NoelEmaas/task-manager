import database from "../database/index.js";

const Task = database.tasks;

const create = async (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Title can not be empty!",
    });
    
    return;
  }

  const task = {
    title: req.body.title,
    due: req.body.due,
  };

  try {
    const newTask = await Task.create(task);
    res.status(200).json({ newTask });
  } catch (error) {
    const errorMessage = `Failed to create task: ${error}`;
    console.error(errorMessage);
    res.status(400).send({
      message: errorMessage,
    });
  }
};

const get = async (req, res) => {
  const id = req.params.id;
    
  try {
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(400).send({
        message: `Task with id ${id} not found`,
      });
    }

    res.status(200).json({ task });
  } catch (error) {
    const errorMessage = `Failed to get task: ${error}`;
    console.error(errorMessage);
    res.status(400).send({
      message: errorMessage,
    });
  }
};

const list = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json({ tasks });
  } catch (error) {
    const errorMessage = `Failed to get tasks: ${error}`;
    console.error(errorMessage);
    res.status(400).send({
      message: errorMessage,
    });
  }
};

const update = async (req, res) => {
  const { id, title } = req.body;

  try {
    if (!title) {
      return res.status(400).send({
        message: "Title can not be empty!",
      });
    }

    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(400).send({
        message: `Task with id ${id} not found`,
      });
    }

    const updatedTask = await task.update(req.body);
    res.status(200).json({ updatedTask });
  } catch (error) {
    const errorMessage = `Failed to update task: ${error}`;
    console.error(errorMessage);
    res.status(400).send({
      message: errorMessage,
    });
  }
};

const drop = async (req, res) => {
  const id = req.params.id;

  try {
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(400).send({
        message: `Task with id ${id} not found`,
      });
    }

    await task.destroy();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    const errorMessage = `Failed to delete task: ${error}`;
    console.error(errorMessage);
    res.status(400).send({
      message: errorMessage,
    });
  }
};

const TaskController = {
  create,
  get,
  list, 
  update,
  drop,
};

export default TaskController;