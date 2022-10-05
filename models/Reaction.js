const { Schema, model } = require("mongoose");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: new Schema.Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: time,
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

// const Reaction = model("reaction", reactionSchema); (commented out since we are not supposed to make Reaction a model)
function time(createdAt) {
  return `${createdAt.getMonth()}/${createdAt.getDay()}/${createdAt.getFullYear()} at ${createdAt.getHours()}:${createdAt.getMinutes()}`;
}
module.exports = reactionSchema;

//When I set this up as a schema and only export the schema,
//I get an error saying that Reaction.create is not a function.
//When I create a model to fix this, then the fields inside this
//schema don't make sense (ObjectId error)
