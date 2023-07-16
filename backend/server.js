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

app.post("/login", auth.authenticate, auth.login);
app.get("/projects", api.listProjects);
app.get("/projects/:id", api.getProject);
app.post(
  "/projects",
  auth.ensureAdmin,
  fileUploader.single("project-cover-image"),
  api.createProject
);
app.put("/projects/:id", auth.ensureAdmin, api.editProject);
app.delete("projects/:id", auth.ensureAdmin, api.deleteProject);

app.get("/messages", api.listMessages);
app.post("/messages", api.createMessage);
app.delete("/messages/:id", auth.ensureAdmin, api.deleteMessage);

app.use(middleware.handleValidationError);
app.use(middleware.handleError);
app.use(middleware.notFound);
app.listen(port, () => console.log(`Listening on port ${port}`));

if (require.main !== module) {
  module.exports = server;
}
