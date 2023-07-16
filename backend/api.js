const Projects = require("./projects");
const Messages = require("./messages");
const autoCatch = require("./lib/auto-catch");

module.exports = autoCatch({
  //Projects
  createProject,
  getProject,
  listProjects,
  editProject,
  deleteProject,
  // Messages
  createMessage,
  getMessage,
  listMessages,
  deleteMessage
});

// Project Controllers
async function createProject(req, res, next) {
  const { projectName, description, techs } = req.body;
  const project = await Projects.create({
    projectName,
    description,
    techs
    // imageUrl: req.file.path This will only work from the front end when a file is uploaded. Do this when you build the frontend
  });
  res.json(project);
}
async function getProject(req, res, next) {
  const { id } = req.params;

  const project = await Projects.get(id);
  if (!project) return next();
  res.json(project);
}

async function listProjects(req, res) {
  const { offset = 0, limit = 25, tech } = req.query;
  res.json(
    await Projects.list({
      offset: Number(offset),
      limit: Number(limit),
      tech
    })
  );
}

async function editProject(req, res, next) {
  const change = req.body;
  const project = await Projects.edit(req.params.id, change);
  res.json(project);
}

async function deleteProject(req, res, next) {
  await Projects.remove(req.params.id);
  res.json({ success: true });
}
// End of Project controllers

// Messages Controllers
async function createMessage(req, res, next) {
  const message = await Messages.create(req.body);
  res.json(message);
}
async function getMessage(req, res, next) {
  const { id } = req.params;

  const message = await Messages.get(id);
  if (!message) return next();
  res.json(message);
}

async function listMessages(req, res) {
  const { offset = 0, limit = 25 } = req.query;
  res.json(
    await Messages.list({
      offset: Number(offset),
      limit: Number(limit)
    })
  );
}

// async function editMessage(req, res, next) {
//   const change = req.body;
//   const message = await Messages.edit(req.params.id, change);
//   res.json(message);
// }

async function deleteMessage(req, res, next) {
  await Messages.remove(req.params.id);
  res.json({ success: true });
}
// End of messages controllers
