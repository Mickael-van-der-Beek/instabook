'use strict';

const express = require('express');
const postLikesTable = require('../../database/tables/post-likes-table');

const postLikeRouter = express.Router();

postLikeRouter.get('/count', async (req, res, next) => {
  const { postId } = req.query;
  try {
    const likesCount = await postLikesTable.countLikes(postId);
    return res.json(likesCount);
  } catch (err) {
    return next(err);
  }
});

postLikeRouter.post('/', async (req, res, next) => {
  const { userId, postId } = req.body;
  try {
    await postLikesTable.like(userId, postId);
    await postTable.incrementLikes(postId);
    return res.sendStatus(200);
  } catch (err) {
    return next(err);
  }
});

module.exports = postLikeRouter;
