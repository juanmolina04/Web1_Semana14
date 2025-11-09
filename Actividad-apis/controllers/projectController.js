const projects = require('../data/projects');

exports.getAll = (req, res) => res.json(projects);

exports.getById = (req, res) => {
  const project = projects.find(p => p.id === parseInt(req.params.id));
  if (!project) return res.status(404).json({ message: "Proyecto no encontrado" });
  res.json(project);
};

exports.create = (req, res) => {
  const { name, description, personId } = req.body;
  const newProject = { id: projects.length + 1, name, description, personId };
  projects.push(newProject);
  res.json({ message: "Proyecto creado", newProject });
};

exports.update = (req, res) => {
  const project = projects.find(p => p.id === parseInt(req.params.id));
  if (!project) return res.status(404).json({ message: "No encontrado" });
  Object.assign(project, req.body);
  res.json({ message: "Proyecto actualizado", project });
};

exports.delete = (req, res) => {
  const index = projects.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "No encontrado" });
  projects.splice(index, 1);
  res.json({ message: "Proyecto eliminado" });
};
