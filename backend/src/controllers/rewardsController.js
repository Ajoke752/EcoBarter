import Reward from "../models/Reward.js";

export const getRewards = async (req, res, next) => {
  try {
    const rewards = await Reward.find();
    res.json(rewards);
  } catch (err) {
    next(err);
  }
};

export const addReward = async (req, res, next) => {
  try {
    const reward = await Reward.create(req.body);
    res.status(201).json(reward);
  } catch (err) {
    next(err);
  }
};
