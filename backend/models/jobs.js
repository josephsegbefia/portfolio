const cuid = require("cuid");
const db = require("../db");
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

const JobSchema = new db.Schema(
  {
    _id: { type: String, default: cuid },
    employerName: { type: String, required: true },
    employerLogo: { type: String },
    employerWebsite: urlSchema(),
    employerCompanyType: { type: String },
    jobPublisher: { type: String },
    jobId: { type: String },
    jobTitle: { type: String },
    jobApplyLink: { type: String },
    jobDescription: { type: String },
    jobCity: { type: String },
    jobCountry: { types: String },
    jobOfferExpirationDateTime: { type: Date },
    dateApplied: { type: Date, default: Date.now() },
    status: {
      type: String,
      index: true,
      default: "APPLIED",
      enum: ["APPLIED", "FIRST CONTACT", "INTERVIEWING", "REJECTED", "LANDED"]
    }
  },
  { timestamps: true } // Add the timestamps option here
);

const Job = db.model("Job", JobSchema);
module.exports = {
  get,
  list,
  create,
  edit,
  remove,
  model: Job
};

async function create(fields) {
  const job = await new Job(fields).save();
  return job;
}

async function get(_id) {
  const job = await Job.findById(_id);
  return job;
}

async function list(opts = {}) {
  const { offset = 0, limit = 25 } = opts;
  //   const query = tech ? { techs: tech } : {};

  const jobs = await Job.find().sort({ _id: 1 }).skip(offset).limit(limit);
  return jobs;
}

async function edit(_id, change) {
  const job = await get(_id);
  Object.keys(change).forEach(function (key) {
    job[key] = change[key];
  });
  await job.save();
  return job;
}

async function remove(_id) {
  await Job.deleteOne({ _id });
}
