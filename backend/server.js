const express = require("express");
const api = require("./api");
const middleware = require("./middleware");
const bodyParser = require("body-parser");
require("dotenv").config();
const auth = require("./auth");
const cookieParser = require("cookie-parser");

const fileUploader = require("./config/cloudinary.config");
const port = process.env.PORT || 1337;

const app = express();

app.use(middleware.cors);
app.use(bodyParser.json());
app.use(cookieParser());

// Auth & Login Routes
app.post("/login", auth.authenticate, auth.login);

// Project Routes
app.get("/projects", api.listProjects);
app.get("/projects/:id", api.getProject);
app.post(
  "/projects",
  auth.ensureAdmin,
  fileUploader.single("project-cover-image"), // "project-cover-image" ====> Input name in form to accept image upload (Frontend)
  api.createProject
);
app.put("/projects/:id", auth.ensureAdmin, api.editProject);
app.delete("projects/:id", auth.ensureAdmin, api.deleteProject);

//Messages Routes
app.get("/messages", auth.ensureAdmin, api.listMessages);
app.post("/messages", api.createMessage);
app.delete("/messages/:id", auth.ensureAdmin, api.deleteMessage);

//Profile Routes
app.get("/profile/:id", auth.ensureAdmin, api.getProfile);
app.post(
  "/profile",
  auth.ensureAdmin,
  fileUploader.single("avatar-image"),
  api.createProfile
);

// Jobs Routes
app.post("/jobs", auth.ensureAdmin, api.createJob);
app.get("/jobs", auth.ensureAdmin, api.listJobs);
app.get("/jobs/:id", auth.ensureAdmin, api.getJob);
app.put("/jobs/:id", auth.ensureAdmin, api.editJob);
app.delete("/jobs/:id", auth.ensureAdmin, api.deleteJob);

app.use(middleware.handleValidationError);
app.use(middleware.handleError);
app.use(middleware.notFound);
app.listen(port, () => console.log(`Listening on port ${port}`));

if (require.main !== module) {
  module.exports = server;
}
