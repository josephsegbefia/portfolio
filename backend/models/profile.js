const cuid = require("cuid");
const db = require("../db");
const { isEmail } = require("validator");
const { isURL } = require("validator");

function emailSchema(opts = {}) {
  const { required } = opts;
  return {
    type: String,
    required: !!required,
    validate: {
      validator: isEmail,
      message: (props) => `${props.value} is not a valid email address`
    }
  };
}

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

const ProfileSchema = new db.Schema(
  {
    _id: { type: String, default: cuid },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    headLine: { type: String },
    email: emailSchema(),
    phone: { type: String },
    about: { type: String, required: true },
    avatarUrl: urlSchema(),
    skills: { type: [String] },
    linkedInUrl: urlSchema(),
    gitHubUrl: urlSchema()
  },
  { timestamps: true }
);

const Profile = db.model("Profile", ProfileSchema);

module.exports = {
  get,
  edit,
  create,
  remove,
  model: Profile
};
async function create(fields) {
  const profile = await new Profile(fields).save();
  return profile;
}

async function get(_id) {
  const profile = await Profile.findById(_id);
  return profile;
}

async function edit(_id, change) {
  const profile = await get(_id);
  Object.keys(change).forEach(function (key) {
    profile[key] = change[key];
  });
  await profile.save();
  return profile;
}

async function remove(_id) {
  await Profile.deleteOne({ _id });
}
