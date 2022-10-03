const { Schema, model } = require("mongoose");

const reactionSchema = new Schema({
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
    //add getter method to format timestamp on query
  },
});

const Reaction = model("reaction", reactionSchema);

module.exports = Reaction;

//When I set this up as a schema and only export the schema,
//I get an error saying that Reaction.create is not a function.
//When I create a model to fix this, then the fields inside this
//schema don't make sense (ObjectId error)
