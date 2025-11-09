const people = require('../data/people');

exports.getAll = (req, res) => res.json(people);

exports.getById = (req, res) => {
  const person = people.find(p => p.id === parseInt(req.params.id));
  if (!person) return res.status(404).json({ message: "Persona no encontrada" });
  res.json(person);
};

exports.create = (req, res) => {
  const { name, email, role } = req.body;
  const newPerson = { id: people.length + 1, name, email, role };
  people.push(newPerson);
  res.json({ message: "Persona creada", newPerson });
};

exports.update = (req, res) => {
  const person = people.find(p => p.id === parseInt(req.params.id));
  if (!person) return res.status(404).json({ message: "No encontrada" });
  Object.assign(person, req.body);
  res.json({ message: "Persona actualizada", person });
};

exports.delete = (req, res) => {
  const index = people.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "No encontrada" });
  people.splice(index, 1);
  res.json({ message: "Persona eliminada" });
};
