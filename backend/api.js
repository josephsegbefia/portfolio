const Projects = require("./models/projects");
const Messages = require("./models/messages");
const Jobs = require("./models/jobs");
const Profiles = require("./models/profile");
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
  deleteMessage,

  //Profile
  createProfile,
  getProfile,
  editProfile,
  deleteProfile,

  //Jobs
  listJobs,
  createJob,
  getJob,
  editJob,
  deleteJob
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
  const { offset = 0, limit = 25, email } = req.query;
  res.json(
    await Messages.list({
      offset: Number(offset),
      limit: Number(limit),
      email
    })
  );
}

async function deleteMessage(req, res, next) {
  await Messages.remove(req.params.id);
  res.json({ success: true });
}
// End of messages controllers

//Profile Controllers

async function createProfile(req, res, next) {
  const { firstName, lastName, email, about, skills } = req.body;
  const profile = await Profiles.create({
    firstName,
    lastName,
    headLine,
    email,
    about,
    skills,
    // avataUrl: req.file.path This will only work from the front end when a file is uploaded. Do this when you build the frontend,
    linkedInUrl,
    gitHubUrl
  });
  res.json(profile);
}
async function getProfile(req, res, next) {
  const { id } = req.params;

  const profile = await Profiles.get(id);
  if (!profile) return next();
  res.json(profile);
}

async function editProfile(req, res, next) {
  const change = req.body;
  const profile = await Profiles.edit(req.params.id, change);
  res.json(profile);
}

async function deleteProfile(req, res, next) {
  await Profiles.remove(req.params.id);
  res.json({ success: true });
}

// JOBS
async function createJob(req, res, next) {
  const {
    employerName,
    employerLogo,
    employerWebsite,
    employerCompanyType,
    jobPublisher,
    jobId,
    jobTitle,
    jobApplyLink,
    jobDescription,
    jobCity,
    jobCountry,
    jobOfferExpirationDateTime,
    dateApplied,
    status
  } = req.body;
  const job = await Jobs.create({
    employerName,
    employerLogo,
    employerWebsite,
    employerCompanyType,
    jobPublisher,
    jobId,
    jobTitle,
    jobApplyLink,
    jobDescription,
    jobCity,
    jobCountry,
    jobOfferExpirationDateTime,
    dateApplied,
    status
    // imageUrl: req.file.path This will only work from the front end when a file is uploaded. Do this when you build the frontend
  });
  res.json(job);
}
async function getJob(req, res, next) {
  const { id } = req.params;

  const job = await Jobs.get(id);
  if (!job) return next();
  res.json(job);
}

async function listJobs(req, res) {
  const { offset = 0, limit = 25 } = req.query;
  res.json(
    await Jobs.list({
      offset: Number(offset),
      limit: Number(limit)
    })
  );
}

async function editJob(req, res, next) {
  const change = req.body;
  const job = await Jobs.edit(req.params.id, change);
  res.json(job);
}

async function deleteJob(req, res, next) {
  await Jobs.remove(req.params.id);
  res.json({ success: true });
}
