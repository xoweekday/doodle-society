const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DBUSER,
  host: 'localhost',
  database: 'doodle',
  password: process.env.DBPASS,
  port: 5432,
});

//  get all the users
const getUsers = (req, res) => {
  return pool.query('SELECT * FROM users ORDER BY id ASC');
}

//retrieve a user by their id number
const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  return pool.query('SELECT * FROM users WHERE id = $1', [id]);
}

//add a user to the db
const createUser = (req, res) => {
  const { username, fullname } = req.body;

  return pool.query('INSERT INTO users (username, fullname) VALUES ($1, $2) RETURNING id', [username, fullname]);
}

//  add a friend relation to the db
//  only reciprocal relationships will be true friends
const addFriend = (req, res) => {
  const {user_id, friend_id} = req.body;

  return pool.query('INSERT INTO friends (user_id, friend_id) VALUES ($1, $2)', [user_id, friend_id]);
}

//  get all friends associated with an id that have added that id back
const getFriends = (req, res) => {
  const { id } = req.params;
  //  get all user id's that user has added as friends
  return pool.query('SELECT friend_id FROM friends WHERE user_id = $1', [id])
    .then((friends) => {
      //  of these id's, get all that have added user back
      return Promise.all(friends.rows.map(friend => {
        return pool.query('SELECT user_id FROM friends WHERE user_id = $1 AND friend_id = $2', [friend.friend_id, id]);
      }));
    })
    .then((confirmedFriends) => {
      //  filter out any empty results, then map to user id's
      const confirmedFriendIds = confirmedFriends
      .filter(cF => cF.rowCount)
      .map(cF => cF.rows[0].user_id);
      //  get all the users associated with confirmed id's
      return Promise.all(confirmedFriendIds.map(cFId => {
        return pool.query('SELECT * FROM users WHERE id = $1', [cFId]);
      }));
    });
}

//  this will return anyone who has added the user as a friend
//  whatever id's in the results are NOT present in the user's friends (stored client-side), will be the pending
//  requests
const getFriendRequests = (req, res) => {
  const { id } = req.params;
  return pool.query('SELECT user_id FROM friends WHERE friend_id = $1', [id]);
}

const removeFriend = (req, res) => {
  const { user_id, friend_id } = req.body;
  return pool.query('DELETE FROM friends WHERE user_id = $1 AND friend_id = $2', [user_id, friend_id]);
}

const addImage = (req, res) => {
  const { url, uploader_id } = req.body;
  return pool.query('INSERT INTO images (url, uploader_id) VALUES ($1, $2) RETURNING id', [url, uploader_id]);
}

const addDoodle = (req, res) => {
  const { url, original_id, doodler_id } = req.body;
  return pool.query('INSERT INTO doodles (url, original_id, doodler_id) VALUES ($1, $2) RETURNING id', 
  [url, original_id, doodler_id]);
}

const getUserUploads = (req, res) => {
  const { id } = req.params;
  return pool.query('SELECT * FROM images WHERE uploader_id = $1', [id]);
}

const getUserDoodles = (req, res) => {
  const { id } = req.params;
  return pool.query('SELECT * FROM doodles WHERE doodler_id = $1', [id]);
}


module.exports = {
  getUsers,
  getUserById,
  createUser,
  addFriend,
  getFriends,
  getFriendRequests,
  removeFriend,
  addImage,
  addDoodle,
  getUserUploads,
  getUserDoodles,
}