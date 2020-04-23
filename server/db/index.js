const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DBUSER,
  host: process.env.DBHOST || 'localhost',
  database: 'doodle',
  password: process.env.DBPASS,
  port: 5432,
  ssl: process.env.SSL || false,
});

//  get all the users
const getUsers = (req, res) => {
  return pool.query('SELECT * FROM users ORDER BY id ASC');
}
//retrieve a user by their id number
const getUserByGoogleId = (req, res) => {
  const googleId = req.body.googleId;

  return pool.query('SELECT * FROM users WHERE googleId = $1', [googleId]);
}

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  return pool.query('SELECT * FROM users WHERE id = $1', [id]);
}

const getUserByName = (req, res) => {
  let { name } = req.params;
  name = `%${name}%`;
  return pool.query('SELECT * FROM users WHERE name ILIKE $1 OR $1 % name ORDER BY SIMILARITY(name, $1) DESC LIMIT 8', [name]);
}

const addComments = (req, res) => {
  const { comment, doodle_id, user_id } = req.body;
  return pool.query('INSERT INTO comments (comment, doodle_id, user_id) VALUES ($1, $2, $3) RETURNING id', [comment, doodle_id, user_id]);
}

const getComments = (req, res) => {
  const { doodle_id } = req.params;
  return pool.query('SELECT comments.*, users.name AS username, users.imageUrl AS avatar FROM comments, users WHERE comments.doodle_id = $1 AND comments.user_id = users.id', [doodle_id]);
}

//add a user to the db
const createUser = (req, res) => {
  const { googleId, email, name, imageUrl } = req.body;
  return pool.query('INSERT INTO users (googleId, email, name, imageUrl) VALUES ($1, $2, $3, $4) RETURNING id', 
  [googleId, email, name, imageUrl]);
}

//  add a friend relation to the db
//  only reciprocal relationships will be true friends
const addFriend = (req, res) => {
  const {user_id, friend_id} = req.body;
  return pool.query('SELECT FROM friends WHERE user_id = $1 AND friend_id = $2', [user_id, friend_id])
    .then((result) => {
      if (result.rowCount) {
        return Promise.resolve('exists')
      }
      return pool.query('INSERT INTO friends (user_id, friend_id) VALUES ($1, $2)', [user_id, friend_id]);
    });
  
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
  return pool.query('SELECT users.* FROM friends, users WHERE friends.friend_id = $1 AND friends.user_id = users.id', [id]);
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
  const { url, caption, original_id, doodler_id } = req.body;
  return pool.query('INSERT INTO doodles (url, caption, original_id, doodler_id) VALUES ($1, $2, $3, $4) RETURNING id', 
  [url, caption, original_id, doodler_id]);
}


const addLikedDoodle = (req, res) => {
  const { userId, doodleId } = req.params;
  
  return pool.query('SELECT count FROM doodles WHERE id = $1', [doodleId])
  .then(doodCount => {
    return pool.query('UPDATE doodles set count = $1 WHERE id = $2', [doodCount.rows[0].count + 1, doodleId])
  })
  .then(() => {
    return pool.query('INSERT INTO likes (user_id, doodle_id) VALUES ($1, $2) RETURNING id', [userId, doodleId]);
  })
}

const unLikedDoodle = (req, res) => {
  const { userId, doodleId } = req.params;
  
  return pool.query('SELECT count FROM doodles WHERE id = $1', [doodleId])
  .then(doodCount => {
    return pool.query('UPDATE doodles set count = $1 WHERE id = $2', [doodCount.rows[0].count - 1, doodleId])
  })
  .then(() => {
    return pool.query('DELETE FROM likes WHERE doodle_id = $1', [doodleId]);
  })
}

const getLikedDoodles = (req, res) => {
  const { userId } = req.params;

  return pool.query('SELECT doodle_id FROM likes WHERE user_id = $1', [userId])
    .then((doodleId) => {
      console.log(doodleId.rows);
      return Promise.all(doodleId.rows.map((id) => {
         return pool.query('SELECT * from doodles WHERE id = $1', [id.doodle_id])
      }))
    })
}

const getUserUploads = (req, res) => {
  const { id } = req.params;
  return pool.query('SELECT * FROM images WHERE uploader_id = $1 ORDER BY created_at DESC', [id]);
}

const getImageById = (req, res) => {
  const { id } = req.params;
  return pool.query('SELECT url FROM images WHERE id = $1', [id]);
}

const getUserDoodles = (req, res) => {
  const { id } = req.params;
  return pool.query('SELECT doodles.*, users.name AS username, images.url AS original_url FROM doodles, users, images WHERE doodles.doodler_id = $1 AND users.id = $1 AND doodles.original_id = images.id ORDER BY created_at DESC', [id]);
}

module.exports = {
  getUsers,
  getUserByGoogleId,
  getUserById,
  getUserByName,
  createUser,
  addFriend,
  getFriends,
  getFriendRequests,
  removeFriend,
  addImage,
  addDoodle,
  getUserUploads,
  getUserDoodles,
  getImageById,
  addLikedDoodle,
  getLikedDoodles,
  unLikedDoodle,
  addComments,
  getComments,
}