import { User, Thought } from '../models/index.js';
import { Request, Response } from 'express';


  // Get all users
  export const getUsers = async (_req: Request, res: Response) => {
    try {
      const users = await User.find();

      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // Get a single user
  export const getSingleUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('friends')
        .populate('friends')

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      res.json(user);
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }

  // Update a user
  export const updateUser = async (req: Request, res: Response) => {
    try {
      const users = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
  
      if (!users) {
        return res.status(404).json({ message: 'No video with this id!' });
      }
  
      res.json(users);
      return;
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
      return; 
    }
  }

  // create a new user
  export const createUser = async (req: Request, res: Response) => {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // Delete a user and associated apps
  export const deleteUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: 'User and associated apps deleted!' })
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }

  export const addFriend = async (req: Request, res: Response) => {
      try {
        const user = await User.findOneAndUpdate(
          { _id: req.params.userId},
          { $addToSet: { friends: req.params.friendId } },
          { runValidators: true, new: true }
        );
  
        if (!user) {
          return res.status(404).json({ message: 'No user with this id!' });
        }
        res.json(user);
        return;
      } catch (err) {
        res.status(500).json(err);
        return;
      }
  };

  export const removeFriend = async (req: Request, res: Response) => {
    try {
  
      // Update the user's friend list
      const user = await User.findByIdAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } }, // Remove the friend ID from the list
        { new: true } // Return the updated document
      );
  
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
  
      res.json({ message: 'Friend removed successfully!', user });
      return;
    } catch (error) {
      res.status(500).json(error);
      return;
    }
  };

