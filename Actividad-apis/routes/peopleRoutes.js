// Ruta de integración: Persona con sus proyectos y tareas
router.get('/:id/full', (req, res) => {
  const id = parseInt(req.params.id);

  const people = require('../data/people');
  const projects = require('../data/projects');
  const tasks = require('../data/tasks');

  const person = people.find(p => p.id === id);
  if (!person) return res.status(404).json({ message: "Persona no encontrada" });

  // Proyectos que tiene esta persona
  const personProjects = projects.filter(pr => pr.personId === person.id);

  // Tareas asociadas a esos proyectos
  const personTasks = tasks.filter(ts => personProjects.some(pr => pr.id === ts.projectId));

  res.json({
    person,
    projects: personProjects,
    tasks: personTasks
  });
});

