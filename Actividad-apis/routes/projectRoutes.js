// Ruta de integración: Proyecto con su líder y sus tareas
router.get('/:id/full', (req, res) => {
  const id = parseInt(req.params.id);

  // Importamos los datos
  const projects = require('../data/projects');
  const people = require('../data/people');
  const tasks = require('../data/tasks');

  // Buscamos el proyecto
  const project = projects.find(p => p.id === id);
  if (!project) return res.status(404).json({ message: "Proyecto no encontrado" });

  // Buscamos la persona (líder) que tiene este proyecto
  const leader = people.find(p => p.id === project.personId);

  // Buscamos las tareas asociadas al proyecto
  const projectTasks = tasks.filter(t => t.projectId === project.id);

  // Respuesta combinada
  res.json({
    project,
    leader,
    tasks: projectTasks
  });
});

