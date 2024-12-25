import { User, Thought } from '../models/index.js';
import { Request, Response } from 'express';
// import { Types } from 'mongoose';

  // Get all users
  export const getThoughts = async (_req: Request, res: Response) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // Get a single thought
  export const getSingleThought = async (req: Request, res: Response) => {
    try {
      const thoughts = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v');

      if (!thoughts) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thoughts);
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }

  // create a new thought
  export const createThought = async (req: Request, res: Response) => {
    try {
      const thoughts = await Thought.create(req.body);
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // update a thought
  export const updateThought = async (req: Request, res: Response) => {
    try {
      const thoughts = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
  
      if (!thoughts) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }
  
      res.json(thoughts);
      return;
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
      return; 
    }
  }

  // Delete a thought
  export const deleteThought = async (req: Request, res: Response) => {
    try {
      const thoughts = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
  
      if (!thoughts) {
        return res.status(404).json({ message: 'No Thought with this id!' });
      }
  
      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );
  
      if (!user) {
        return res
          .status(404)
          .json({ message: 'Thought deleted but no user with this id!' });
      }
  
      res.json({ message: 'Thought successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  
    return; 
  }

  // POST: Add a reaction to a thought
  export const addReaction = async (req: Request, res: Response) => {
    try {
      const thoughts = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thoughts) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thoughts);
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }

  // DELETE: Remove a reaction by reactionId
export const removeReaction = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );
  
      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this ID!' });
      }
  
      res.json(thought);
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  };