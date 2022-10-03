const { User, Thought, Reaction } = require("../models");

module.exports = {
  //get all thoughts - working
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  //get a single thought by id -working
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
  //post route to create new thought (make sure to push thought's id to associated user's thoughts array) - working
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) =>
        User.findOneAndUpdate(
          { username: req.body.username },
          { $push: { thoughts: thought._id } },
          { runValidators: true, new: true }
        )
      )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with this id" })
          : res.json("New thought successfully created!")
      )
      .catch((err) => res.status(500).json(err));
  },
  // put route to update thought by id - working

  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with that id" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  //delete route to remove thought by id - working

  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with that id" })
          : res.status(200).json({ message: "Thought successfully deleted." })
      )
      .catch((err) => res.status(500).json(err));
  },

  //post route to create reaction, stored in a thought's reaction array
  addReaction(req, res) {
    Reaction.create(req.body)
      .then((reaction) =>
        Thought.findOneAndUpdate(
          {
            _id: req.params.thoughtId,
          },
          { $addToSet: { reactions: { reaction } } },
          { runValidators: true, new: true }
        )
      )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with this id" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  //delete route to pull and remove a reaction by the reaction's id
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: req.body.reactionId } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with that id" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
