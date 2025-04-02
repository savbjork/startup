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
  res.status(401).send({ msg: 'Unauthorized' });
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
  console.log("Getting friends for user");
  const friends = await DB.getFriends(req.cookies[authCookieName]);
  res.send(friends || []);
});

// Add a Friend for Logged-In User
apiRouter.post('/addFriend', verifyAuth, async (req, res) => {
  console.log("Adding friend for user, request body:", req.body);
  if (!req.body.name) {
    return res.status(400).send({ msg: 'Invalid input' });
  }
  const user = await findUser('email', req.body.name);
  if (!user) {
    return res.status(404).send({ msg: 'User not found' });
  }
  const data = await DB.addFriend(req.cookies[authCookieName], req.body.name);
  res.send(data.friends);
  // req.user.friends.push(req.body.name);
  // res.send(req.user.friends);
});

// Delete a Friend for Logged-In User
apiRouter.delete('/deleteFriend/:friendName', verifyAuth, async (req, res) => {
  console.log("Deleting friend for user:", req.params.friendName);
  const friendName = req.params.friendName;
  const data = await DB.getFriends(req.cookies[authCookieName])
  const index = data.friends.indexOf(friendName);
  
  if (index !== -1) {
    //req.user.friends.splice(index, 1);
    DB.deleteFriend(req.cookies[authCookieName], friendName);
    const data = await DB.getFriends(req.cookies[authCookieName])
    res.send({ msg: `${friendName} removed`, friends: data.friends });
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
    //availNow: '',
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
//Get current availability ("Available Now")
apiRouter.get('/getAvailabilityNow', verifyAuth, async (req, res) => {
  const data = await DB.getAvailabilityNow(req.cookies[authCookieName]);
  console.log("Current availability:", data.availNow);
  res.send(data.availNow);
});

// Set "Available Now" status
apiRouter.post('/setAvailabilityNow', verifyAuth, async (req, res) => {
  console.log("Setting current availability for:", req.body);
  if (!req.body.availableUntil) {
    return res.status(400).send({ msg: 'Invalid available until time' });
  }
  // req.user.availableUntil = req.body.availableUntil;
  // res.send({ availableUntil: req.user.availableUntil });
  const data = await DB.addAvailabilityNow(req.cookies[authCookieName], req.body.availableUntil);
  res.send(data.availNow);
});

// Get weekly availability
apiRouter.get('/getAvailabilityWeekly', verifyAuth, async (req, res) => {
  data = await DB.getAvailabilityWeekly(req.cookies[authCookieName]);
  console.log("Weekly availability:", data.availWeekly);
  res.send(data.availWeekly);
  //res.send(req.user.availWeekly || []);
});

// Add a weekly availability slot
apiRouter.post('/addAvailabilityWeekly', verifyAuth, async (req, res) => {
  console.log("Adding weekly availability for user:", req.body);
  if (!req.body.day || !req.body.start || !req.body.end) {
    return res.status(400).send({ msg: 'Invalid availability slot' });
  }

  const data = await DB.addAvailabilityWeekly(req.cookies[authCookieName], {
    day: req.body.day,
    start: req.body.start,
    end: req.body.end
  });
  res.send(data.availWeekly);
  // req.user.availWeekly.push({
  //   day: req.body.day,
  //   start: req.body.start,
  //   end: req.body.end
  // });
  // res.send(req.user.availWeekly);
});

// Delete a weekly availability slot
apiRouter.delete('/deleteAvailabilityWeekly/:day/:start/:end', verifyAuth, async (req, res) => {
  console.log("Deleting weekly availability for user:", req.params);
  const { day, start, end } = req.params;
  const data = await DB.deleteAvailabilityWeekly(req.cookies[authCookieName], {
    day: day,
    start: start,
    end: end
  });
  res.send(data.availWeekly);
  // req.user.availWeekly = req.user.availWeekly.filter(slot =>
  //   !(slot.day === day && slot.start === start && slot.end === end)
  // );
  // res.send(req.user.availWeekly);
});

//friend status
app.post('/api/getFriendStatuses', verifyAuth, async (req, res) => {
  console.log("Fetching friend statuses...");
  const data = await DB.getFriends(req.cookies[authCookieName]);
  console.log("Friend data:", data.friends);
  const friendStatuses = await Promise.all(data.friends.map(async friend => ({
    name: friend,
    status: await DB.getStatus(friend),
  })));
  console.log("Friend statuses:", friendStatuses);
  const available = friendStatuses
    .filter(friend => friend.status === 'AVAILABLE')
    .map(friend => friend.name);
  const busy = friendStatuses
    .filter(friend => friend.status === 'BUSY')
    .map(friend => friend.name);
  res.json({ available, busy });
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
