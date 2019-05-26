'use strict';

const database = require('../database');
const SQL = require('pg-template-tag').default;

const createTable = () => database.query(`
  CREATE TABLE IF NOT EXISTS
    posts_likes
    (
      id SERIAL PRIMARY KEY,
      post_id INTEGER NOT NULL REFERENCES posts (id) ON DELETE CASCADE,
      user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE
    );
`);

const like = (userId, postId) => database.query(SQL`
  INSERT INTO
    posts_likes
    (
      user_id,
      post_id
    )
  VALUES
    (
      ${userId},
      ${postId}
    );
`);

const countLikes = async postId => (await database.query(SQL`
  SELECT
    COUNT(*) AS count
  FROM
    posts_likes
  WHERE
    post_id = ${postId};
`))[0];

module.exports = {
  createTable,
  like,
  countLikes
};
