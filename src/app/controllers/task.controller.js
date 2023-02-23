const { FailedResponse, SuccessResponse } = require("../helpers/api.response");
const TaskService = require("../services/task.service");
const status = require("http-status");

const addTask = async (req, res) => {
  try {
    const { title, description, is_finished } = req.body;
    const data = {
      title: title,
      description: description,
      is_finished: is_finished,
    };
    await TaskService.AddTask(data);
    res
      .status(status.OK)
      .json(SuccessResponse(status.OK, "Task Successfully Added"));
  } catch (error) {
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .json(FailedResponse(status.INTERNAL_SERVER_ERROR, error));
  }
};

const viewTask = async (req, res) => {
  try {
    const task = await TaskService.ViewTask();
    res.status(status.OK).json(SuccessResponse(status.OK, null, task));
  } catch (error) {
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .json(FailedResponse(status.INTERNAL_SERVER_ERROR, error));
  }
};

const viewTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const taskCheck = await TaskService.CheckTask(taskId);
    if (!taskCheck) {
      return res
        .status(status.NOT_FOUND)
        .json(FailedResponse(status.NOT_FOUND, "Task Not Found!"));
    }
    const task = await TaskService.ViewTaskById(taskId);
    res.status(status.OK).json(SuccessResponse(status.OK, null, task));
  } catch (error) {
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .json(FailedResponse(status.INTERNAL_SERVER_ERROR, error));
  }
};

const patchTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const taskCheck = await TaskService.CheckTask(taskId);
    if (!taskCheck) {
      return res
        .status(status.NOT_FOUND)
        .json(FailedResponse(status.NOT_FOUND, "Task Not Found!"));
    }
    const { title, description, is_finished } = req.body;
    const data = {
      title: title,
      description: description,
      is_finished: is_finished,
    };
    await TaskService.PatchTask(taskId, data);
    res
      .status(status.OK)
      .json(SuccessResponse(status.OK, "Task Successfully Patched!"));
  } catch (error) {
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .json(FailedResponse(status.INTERNAL_SERVER_ERROR, error));
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const taskCheck = await TaskService.CheckTask(taskId);
    if (!taskCheck) {
      return res
        .status(status.NOT_FOUND)
        .json(FailedResponse(status.NOT_FOUND, "Task Not Found!"));
    }
    await TaskService.DeleteTask(taskId);
    res
      .status(status.OK)
      .json(SuccessResponse(status.OK, "Task Successfully Deleted!"));
  } catch (error) {
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .json(FailedResponse(status.INTERNAL_SERVER_ERROR, error));
  }
};

module.exports = {
  addTask,
  viewTask,
  viewTaskById,
  patchTask,
  deleteTask,
};
