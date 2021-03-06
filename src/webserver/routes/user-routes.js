'use strict';

// Import the Express server module
const express = require('express');
const userTable = require('../../database/tables/user-table');

// Create our router for our users API
const userRouter = express.Router();

// Get all users
userRouter.get('/', async (req, res, next) => {
  const search = req.query.search;
  const offset = req.query.offset;
  let limit = parseInt(req.query.limit, 10);

  if (isNaN(limit)) {
    return res.sendStatus(400);
  }

  if (limit > 20) {
    return res.sendStatus(400);
  }

  console.log('search=', search, typeof search);
  console.log('offset=', offset, typeof offset);
  console.log('limit=', limit, typeof limit);
  try {
    const users = await userTable.getRows(search, offset, limit);
    return res.json(users);
  } catch (err) {
    return next(err);
  }
});

// Create a user
userRouter.post('/', async (req, res) => {
  const data = req.body;
  try {
    const user = await userTable.createRow(data);
    return res.json(user);
  } catch (err) {
    return next(err);
  }
});

// Get one specific user by id
userRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userTable.getRow(id);
    return res.json(user);
  } catch (err) {
    return next(err);
  }
});

// Modify one specific user by id
userRouter.put('/:id', async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const user = await userTable.updateRow(id, data);
    return res.json(user);
  } catch (err) {
    return next(err);
  }
});

// Delete one specific user by id
userRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await userTable.deleteRow(id);
    return res.json({});
  } catch (err) {
    return next(err);
  }
});

// Export our user router
module.exports = userRouter;
