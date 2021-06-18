/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

const commentData = require('./data/comments.json');
const postData = require('./data/posts.json');
const userData = require('./data/users.json');

const mockData = {
  posts: postData.posts,
  comments: commentData.comments,
  users: userData.users,
};

const dataPath = path.join(__dirname, 'db.json');
fs.writeFileSync(dataPath, JSON.stringify(mockData));
console.log('Successfully created mock data.');
