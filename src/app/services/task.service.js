const { Tasks } = require("../../database/models/index");

const AddTask = async (data) => {
  return await Tasks.create(data);
};

const ViewTask = async () => {
  return await Tasks.findAll({
    attributes: ["id", "title", "description", "is_finished"],
  });
};

const ViewTaskById = async (taskId) => {
  return await Tasks.findByPk(taskId, {
    attributes: ["id", "title", "description", "is_finished"],
  });
};

const PatchTask = async (taskId, data) => {
  return await Tasks.update(data, {
    where: {
      id: taskId,
    },
  });
};

const DeleteTask = async (taskId) => {
  return await Tasks.destroy({
    where: {
      id: taskId,
    },
  });
};

const CheckTask = async (taskId) => {
  return await Tasks.findOne({
    where: {
      id: taskId,
    },
  })
}

module.exports = {
  AddTask,
  ViewTask,
  ViewTaskById,
  DeleteTask,
  PatchTask,
  CheckTask
};
