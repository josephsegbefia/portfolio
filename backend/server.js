const express = require("express");
const api = require("./api");
const middleware = require("./middleware");
const bodyParser = require("body-parser");

const port = process.env.PORT || 1337;

const app = express();

app.use(middleware.cors);
app.use(bodyParser.json());

app.get("/projects", api.listProjects);
app.get("/projects/:id", api.getProject);
app.post("/projects", api.createProject);
app.put("/projects/:id", api.editProject);
app.delete("projects/:id", api.deleteProject);

app.get("/messages", api.listMessages);
app.post("/messages", api.createMessage);
app.delete("/messages/:id", api.deleteMessage);

app.use(middleware.handleError);
app.use(middleware.notFound);
app.listen(port, () => console.log(`Listening on port ${port}`));
