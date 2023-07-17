const cuid = require("cuid");
const db = require("../db");
const { isEmail } = require("validator");

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

// const Message = db.model("Message", {
//   _id: { type: String, default: cuid },
//   name: { type: String, required: true },
//   email: emailSchema(),
//   message: { type: String, required: true }
// });

const MessageSchema = new db.Schema(
  {
    _id: { type: String, default: cuid },
    name: { type: String, required: true },
    email: emailSchema(),
    message: { type: String, required: true }
  },
  { timestamps: true }
);

const Message = db.model("Message", MessageSchema);

module.exports = {
  get,
  list,
  create,
  remove,
  model: Message
};
async function create(fields) {
  const message = await new Message(fields).save();
  return message;
}

async function get(_id) {
  const message = await Message.findById(_id);
  return message;
}

async function list(opts = {}) {
  const { offset = 0, limit = 25, email } = opts;

  const query = {};
  if (email) query.email = email;
  const messages = await Message.find(query)
    .sort({ _id: 1 })
    .skip(offset)
    .limit(limit);
  return messages;
}

async function remove(_id) {
  await Message.deleteOne({ _id });
}
