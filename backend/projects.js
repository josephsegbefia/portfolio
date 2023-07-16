const cuid = require("cuid");
const db = require("./db");
const { isURL } = require("validator");

function urlSchema(opts = {}) {
  const { required } = opts;
  return {
    type: String,
    required: !!required,
    validate: {
      validator: isURL,
      message: (props) => `${props.value} is not a valid URL`
    }
  };
}
const Project = db.model("Project", {
  _id: { type: String, default: cuid },
  projectName: { type: String, required: true },
  description: { type: String, required: true },
  techs: { type: [String], index: true },
  imageUrl: urlSchema()
});
module.exports = {
  get,
  list,
  create,
  edit,
  remove
};

async function create(fields) {
  const project = await new Project(fields).save();
  return project;
}

async function get(_id) {
  const project = await Project.findById(_id);
  return project;
}

async function list(opts = {}) {
  const { offset = 0, limit = 25, tech } = opts;
  const query = tech ? { techs: tech } : {};

  const projects = await Project.find(query)
    .sort({ _id: 1 })
    .skip(offset)
    .limit(limit);
  return projects;
}

async function edit(_id, change) {
  const project = await get(_id);
  Object.keys(change).forEach(function (key) {
    project[key] = change[key];
  });
  await project.save();
  return project;
}

async function remove(_id) {
  await Project.deleteOne({ _id });
}
