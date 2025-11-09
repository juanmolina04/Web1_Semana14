const tasks = require('../data/tasks');

exports.getAll = (req, res) => res.json(tasks);

exports.getById = (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ message: "Tarea no encontrada" });
  res.json(task);
};

exports.create = (req, res) => {
  const { title, description, projectId, assignedTo, status } = req.body;
  const newTask = { id: tasks.length + 1, title, description, projectId, assignedTo, status: status || "todo" };
  tasks.push(newTask);
  res.json({ message: "Tarea creada", newTask });
};

exports.update = (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ message: "No encontrada" });
  Object.assign(task, req.body);
  res.json({ message: "Tarea actualizada", task });
};

exports.delete = (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "No encontrada" });
  tasks.splice(index, 1);
  res.json({ message: "Tarea eliminada" });
};
