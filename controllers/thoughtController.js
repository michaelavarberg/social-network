const { User, Thought, Reaction } = require("../models");

module.exports = {
  //get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  //get a single thought by id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with that id" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  //post route to create new thought (make sure to push thought's id to associated user's thoughts array)
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) =>
        User.findOneAndUpdate(
          { username: thought.username },
          { $push: { thoughts: thought._id } },
          { runValidators: true, new: true }
        )
      )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "No user found with this username" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // put route to update thought by id
  //delete route to remove thought by id
  //post route to create reaction, stored in a thought's reaction array
  //delete route to pull and remove a reaction by the reaction's id
};
