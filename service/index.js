const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();
const DB = require('./database.js');

const authCookieName = 'token';

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await findUser('email', req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.email, req.body.password);
    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  console.log("Received cookies: req.cookies", req.cookies);
  const user = await findUser('email', req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      await DB.updateUser(user);
      setAuthCookie(res, user.token);
      res.send({ email: user.email });
      return;
    }
  }
  res.status(401).send({ msg: 'ONE Unauthorized' });
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    delete user.token;
    await DB.updateUser(user);
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

// Get Friends for Logged-In User
apiRouter.get('/getFriends', verifyAuth, async (req, res) => {
  console.log("Getting friends for user:", req.user.email, req.user.friends);
  const friends = await DB.getFriends(req.user.token);
  res.send(friends || []);
});

// Add a Friend for Logged-In User
apiRouter.post('/addFriend', verifyAuth, (req, res) => {
  console.log("Adding friend for user:", req.user.email, "->", req.body.name);
  if (!req.body.name || req.user.friends.includes(req.body.name)) {
    return res.status(400).send({ msg: 'Invalid or existing friend' });
  }
  friend = DB.addFriend(req.user.token, req.body.name);
  res.send(friend);
  // req.user.friends.push(req.body.name);
  // res.send(req.user.friends);
});

// Delete a Friend for Logged-In User
apiRouter.delete('/deleteFriend/:friendName', verifyAuth, (req, res) => {
  console.log("Deleting friend for user:", req.user.email, "->", req.params.friendName);
  const friendName = req.params.friendName;
  const index = req.user.friends.indexOf(friendName);
  
  if (index !== -1) {
    req.user.friends.splice(index, 1);
    res.send({ msg: `${friendName} removed`, friends: req.user.friends });
  } else {
    res.status(404).send({ msg: 'Friend not found' });
  }
});

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
    friends: ['Example Friend One', 'Example Friend Two', 'Example Friend Three'], // user now starts with two friends
    availWeekly: [
      { day: 'Monday', start: '09:00', end: '11:00' },
      { day: 'Wednesday', start: '09:00', end: '11:00' },
      { day: 'Friday', start: '09:00', end: '11:00' }
    ], 
    availNow: '',
  };
  await DB.addUser(user);
  return user;
}

async function findUser(field, value) {
  if (!value) return null;

  if (field === 'token') {
    return DB.getUserByToken(value);
  }
  return DB.getUser(value);
}

//stuff for availability
// Get current availability ("Available Now")
apiRouter.get('/getAvailabilityNow', verifyAuth, async (req, res) => {
  console.log("Fetching current availability for:", req.user.email);
  availNow = DB.getAvailabilityNow(req.user.token);
  res.send(availNow);
});

// Set "Available Now" status
apiRouter.post('/setAvailabilityNow', verifyAuth, (req, res) => {
  console.log("Setting current availability for:", req.user.email, "->", req.body);
  if (!req.body.availableUntil) {
    return res.status(400).send({ msg: 'Invalid available until time' });
  }
  // req.user.availableUntil = req.body.availableUntil;
  // res.send({ availableUntil: req.user.availableUntil });
  DB.addAvailabilityNow(req.user.token, req.body.availableUntil);
  res.send({ availableUntil: req.body.availableUntil });
});

// Get weekly availability
apiRouter.get('/getAvailabilityWeekly', verifyAuth, (req, res) => {
  console.log("Fetching weekly availability for:", req.user.email);
  availWeekly = DB.getAvailabilityWeekly(req.user.token);
  res.send(availWeekly);
  //res.send(req.user.availWeekly || []);
});

// Add a weekly availability slot
apiRouter.post('/addAvailabilityWeekly', verifyAuth, (req, res) => {
  console.log("Adding weekly availability for user:", req.user.email, "->", req.body);
  if (!req.body.day || !req.body.start || !req.body.end) {
    return res.status(400).send({ msg: 'Invalid availability slot' });
  }
  if (!req.user.availWeekly) {
    req.user.availWeekly = [];
  }

  DB.addAvailabilityWeekly(req.user.token, {
    day: req.body.day,
    start: req.body.start,
    end: req.body.end
  });
  res.send(DB.getAvailabilityWeekly(req.user.token));
  // req.user.availWeekly.push({
  //   day: req.body.day,
  //   start: req.body.start,
  //   end: req.body.end
  // });
  // res.send(req.user.availWeekly);
});

// Delete a weekly availability slot
apiRouter.delete('/deleteAvailabilityWeekly/:day/:start/:end', verifyAuth, (req, res) => {
  console.log("Deleting weekly availability for user:", req.user.email, "->", req.params);
  const { day, start, end } = req.params;
  if (!req.user.availWeekly) {
    return res.status(404).send({ msg: 'No availability found' });
  }
  DB.deleteAvailabilityWeekly(req.user.token, {
    day: day,
    start: start,
    end: end
  });
  res.send(DB.getAvailabilityWeekly(req.user.token));
  // req.user.availWeekly = req.user.availWeekly.filter(slot =>
  //   !(slot.day === day && slot.start === start && slot.end === end)
  // );
  // res.send(req.user.availWeekly);
});

//friend status
app.post('/api/getFriendStatuses', verifyAuth, (req, res) => {
  try {
    console.log("Incoming request to fetch friend statuses...");
  if (req.user.token) {
    DB.getFriends(req.user.token)
    .then(friends => {
      const friendStatuses = friends.map(friend => ({
        name: friend.name,
        status: friend.status,
      }));
      return friendStatuses;
    })
    .then(friendStatuses => {
      const available = friendStatuses.filter(friend => friend.status === 'available');
      const busy = friendStatuses.filter(friend => friend.status === 'busy');
      return { available, busy };
    })
    .then(({ available, busy }) => {
      console.log("Friend statuses fetched successfully.");
      res.json({ available, busy });
    })
    .catch(error => {
      console.error("ERROR: Fetching friend statuses failed:", error);
      res.status(500).json({ error: 'Internal server error' });
    });
  }
    console.error("ERROR: Fetching friend statuses failed:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
    
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
