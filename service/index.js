const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();

const authCookieName = 'token';

// Users are stored with their own friends list
let users = [];

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
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
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
  console.log("Verifying auth: req.cookies", req.cookies);
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    req.user = user; // Attach user to request for easier access
    next();
  } else {
    res.status(401).send({ msg: 'TWO Unauthorized' });
  }
};

// Get Friends for Logged-In User
apiRouter.get('/getFriends', verifyAuth, (req, res) => {
  console.log("Getting friends for user:", req.user.email, req.user.friends);
  res.send(req.user.friends || []);
});

// Add a Friend for Logged-In User
apiRouter.post('/addFriend', verifyAuth, (req, res) => {
  console.log("Adding friend for user:", req.user.email, "->", req.body.name);
  if (!req.body.name || req.user.friends.includes(req.body.name)) {
    return res.status(400).send({ msg: 'Invalid or existing friend' });
  }
  req.user.friends.push(req.body.name);
  res.send(req.user.friends);
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
    friends: [], // ✅ Each user now has their own friends list
    availability: []
  };
  users.push(user);
  return user;
}

async function findUser(field, value) {
  if (!value) return null;
  return users.find((u) => u[field] === value);
}

//stuff for availability
apiRouter.get('/getAvailability', verifyAuth, (req, res) => {
  console.log("Getting availability for user:", req.user.email, req.user.availability);
  res.send(req.user.availability || []);
});

apiRouter.post('/addAvailability', verifyAuth, (req, res) => {
  console.log("Adding availability for user:", req.user.email, "->", req.body);
  if (!req.body.day || !req.body.start || !req.body.end) {
    return res.status(400).send({ msg: 'Invalid availability slot' });
  }

  req.user.availability.push({
    day: req.body.day,
    start: req.body.start,
    end: req.body.end
  });

  console.log("Updated availability:", req.user.availability);
  res.send(req.user.availability);
});

apiRouter.delete('/deleteAvailability/:day/:start/:end', verifyAuth, (req, res) => {
  console.log("Deleting availability for user:", req.user.email, "->", req.params);
  const { day, start, end } = req.params;
  const index = req.user.availability.findIndex(slot =>
    slot.day === day && slot.start === start && slot.end === end
  );

  if (index !== -1) {
    req.user.availability.splice(index, 1);
    res.send(req.user.availability);
  } else {
    res.status(404).send({ msg: 'Availability slot not found' });
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
